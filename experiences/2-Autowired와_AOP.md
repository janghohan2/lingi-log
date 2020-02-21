# Autowired와 AOP
AOP(Aspect-oriendted Programming)는 OOP를 보완하는 수단으로, 흩어진 Aspect를 모듈화 할 수 있는 프로그래밍 기법 이고, Autowired는 Spring에서 아~주 간편하게 의존성을 주입하는 방법이다. 토이프로젝트를 진행하며 AOP와 Autowired를 함께 사용하다 겪은 문제상황과 이를 해결한 경험을 기록해놓고자 한다.

우선 말해두지만 나는 SpringBoot 완전 초보라... 모르는게 많다ㅠ

## 문제상황
Controller에 Bean으로 등록한 Service를 @Autowired를 통해 주입 받아 사용하려 했지만 `BeanNotOfRequiredTypeException`이 발생했다. 분명 어제까진 된것 같은데... 뭐때문에 발생한걸까? 
> ### BeanNotOfRequiredTypeException은 언제 발생하지?
> [spring 문서](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/BeanNotOfRequiredTypeException.html)를 보면 이 Exception은 Bean이 예상 타입과 다를 때(Thrown when a bean doesn't match the expected type.) 발생한다고 한다.

수정했던코드를 한단계씩 되돌려가며 실행해 보았고, 예외를 발생시킨 수정을 찾을 수 있었다.
## 무엇이 예외를 발생시켰나
* 코드 A - 정상동작
    ```java
    public class DeployController {
        @Autowired Deploy<DeployItemReqDto> deployComp;
        ...
    }
    ```
* 코드 B - 예외발생 케이스
    ```java
    public class DeployController {
        @Autowired DeployItem deployComp;
        ...
    }
    ```

음 뭐가 다른거지??


일단 클래스 다이어그램을 보자.
![](https://raw.githubusercontent.com/lingi-log/lingi-log/master/assets/images/experiences/deployclassdiagram.jpeg)

인터페이스 `Deploy<T>`가 있고, 이를 구현한 추상클래스 `DeployItem`와 클래스 `DeployGroup`이 있다. 그리고 추상클래스 `DeployItem`를 상속받은 클래스 `DeployItemA`, `DeployItemB`, `DeployItemC`가 있다. `DeployGroup`, `DeployItemA`, `DeployItemB`, `DeployItemC`는 `@Service` 어노테이션을 붙여 Bean으로 등록했다. (설계를 왜 이렇게 했는지에 대한 의문이 든다면 잠시 접어두자.)

다시 코드를 보면 인터페이스인 `Deploy<T>`를 필드로 선언했을 땐 정상 동작하지만  추상클래스 `DeployItem`를 필드로 선언했을 때 예외가 발생한다는 것을 알 수 있다. 여전히 아리송하다.

이쯤 보고 로그를 다시 보자. 뭔가 건질만한게 있을까?
```
Caused by: org.springframework.beans.factory.BeanNotOfRequiredTypeException: Bean named 'deployItemC' is expected to be of type 'com.goodluck.newwm.api.library.deploy.service.DeployItem' but was actually of type 'com.sun.proxy.$Proxy95'
```

여전히 모르겠지만 이상한 점이 하나 보인다. 왜 `deployComp`의 타입이 `com.sun.proxy.$Proxy95`이지? 

회사 동료와 스터디원들에게 물어봤지만 원인을 찾지 못했는데 끈질긴 구글링 덕에 원인을 찾을 수 있었는데, 그 전에 AOP에 대해 살짝 알아보자.

## AOP... 간단하게!
앞서 말한것 처럼 AOP(Aspect-oriendted Programming)는 OOP를 보완하는 수단으로, 흩어진 Aspect를 모듈화 할 수 있는 프로그래밍 기법 이다.
### AOP 용어
용어|설명
-|-
Aspect|공통적으로 적용될 기능을 의미. 횡단 관심사의 기능이라고도 할 수 잇으며 한 개 이상이 Pointcut과 Advice 조합으로 만들어진다.
Advice|관점의 구현체로 조인포인트에 삽입되어 동작하는것을 의미함. 스프링에서 사용하는 Advice는 동작하는 시점에따라 다섯 종류로 구분된다.
Jointpoint|어드바이스를 적용하는 지점을 의미. 스프링에서 Jointpoint는 항상 메서드 실행단계만 가능하다.
Pointcut|Advice를 적용할 조인트포인트를 선별하는 과정이나 그 기능을 정의한 모듈을 의미. 정규표현식이나 AspectJ문법을 이용하여 어떤 Jointpoint를 사용할지 결정.
Target|Advice를 받을 대상을 의미
Weaving|어드바이스를 적용하는것을 의미. 공통 코드를 원하는 대상에 삽입하는것을 의미한다.

### Weaving
종류|설명
-|-
Runtime weaving|JDK dynamic proxy 나 CGLIB proxy를 생성하여 실행시간에 target에 weaving 하는 방식
Compile-time weaving|컴파일 시점에 Application 소스코드와 Aspect 코드를 Weaving 하여 AOP가 적용된 클래스를 만들어내는 방식
Post-compile weaving|Binary weaving이라고도 하며 이미 존재하는 클래스나 JAR파일을 조작하여 weaving 한다.
Load-time weaving|Weaving 하는 시점을 class loader가 class를 jvm에 로드하는 시점으로 늦춘 것 빼고 Post-compile weaving방식과 동일. 

### AOP 구현체
* AspectJ
* 스프링 AOP
### 스프링 AOP
Runtime weaving 방식을 사용하며 프록시 기반 AOP 구현체이다.

### Runtime weaving
proxy(JDK dynamic proxy 나 CGLIB prox)를 사용하여 구현되었다.

![runtime weaving](https://raw.githubusercontent.com/lingi-log/lingi-log/master/assets/images/backend/springboot/aop-3.png)

둘의 차이점은, JDK dynamic proxy는 interface 기반, CGLIB proxy는 class 기반이라는 것이다.
JDK dynamic proxy – Spring AOP에서 선호하는 방법이다. targeted object가 interface를 구현하였다면 JDK dynamic proxy가 사용된다.
CGLIB proxy – target object가 interface를 구현하지 않았다면, CGLIB proxy 가 사용된다.

## 갑자기 웬 AOP일까
갑자기 웬 AOP?라고 생각할 수도 있지만 `DeployItem`을 구현할때

```java
@Override
@Async("asyncExecutor")
public void deploy(DeployItemReqDto deployItemReqDto) throws Exception {
    ...
}
```

이렇게 `@Async` 어노테이션을 붙여놨는데, `@Async`는 AOP 기반으로 동작하게 된다. 뭔가 알것같다.

## 원인
추상클래스 `DeployItem`에 `@Async` 어노테이션을 사용했기 때문에 `DeployItem`를 상속받은 클래스 `DeployItemA`, `DeployItemB`, `DeployItemC`는 **proxy를 통해서 동작**하게 된다. 이 소스에선 AOP 설정을 따로 한게 없기 때문에 SpringAOP(JDK dynamic proxy 기반)를 통해 구현 된다. 그래서 이때 주입받으려는 bean의 필드의 종류를 Interface가 아닌 추상클래스나 구체 클래스를 선언하면 에러가 나는것이었다.
## 문제 해결은 어떻게?
고생한것에 비해 문제 해결방법은 간단했다. AOP가 적용된 Bean을 주입받기 위해선 
1. 필드를 interface로 선언
    ```java
    public class DeployController {
        @Autowired Deploy<DeployItemReqDto> deployComp;
        ...
    }
    ```
1. proxy의 종류를 `CGLIB proxy`로 변경
    ```java
    @EnableAsync(proxyTargetClass=true)
    public class AsyncConfig {
        @Bean(name = "asyncExecutor")
        ...
    }
    ```
1. `AspectJ`를 사용하면 된다.
    ```java
    @EnableAsync(mode= AdviceMode.ASPECTJ)
    public class AsyncConfig {
        @Bean(name = "asyncExecutor")
        ...
    }
    ```
