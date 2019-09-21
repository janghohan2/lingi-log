# Core Technologies
https://docs.spring.io/spring/docs/5.1.x/spring-framework-reference/core.html#beans-dependencies\
Reference 문서의 이번 파트는 Spring Framework에 필수적인 기술 전체를 다룬다.

Spring Framework의 여러 필수 기술 중에서도 가장 중요한 것은 Spring Framework의 Inversion of Control(IoC) 컨테이너 입니다. A thorough treatment of the Spring Framework’s IoC container is closely followed by comprehensive coverage of Spring’s Aspect-Oriented Programming (AOP) technologies. Spring Framework는 독자적인 AOP framework를 가지고 있습니다. 이 프레임워크는 개념적으로 이해하기 쉽고 Java enterprise programming의 AOP 요구사항 중 80%를 해결한다.

## 1. IoC Container
이 챕터에선 스프링의 IoC 컨테이너에 대해 다룬다.
### 1.1. 스프링 IoC 컨테이너와 Bean 소개
이 챕터에선 Spring 에서 Inversion of Control(IoC) 개념을 어떻게 구현했는지 다룬다. IoC는 dependency injection(DI)로도 불린다. 객체가 생성자 인수, 팩토리 메소드에 대한 인수 또는 팩토리 메소드에서 구성되거나 리턴 된 후 오브젝트 인스턴스에 설정된 특성을 통해서만 오브젝트가 종속성 (즉, 작업하는 다른 오브젝트)을 정의하는 프로세스 이다. Container는 bean을 생성할 때 이 dependencies를 주입한다. 이 프로세스는 근본적으로, 클래스의 direct construction이나 Service Locator pattern을 이용하여 bean의 instantiation나 종속성의 위치를 제어하는 '역전' 이다.(??)


`org.springframework.beans`패키지와 `org.springframework.context`패키지는 Spring Framework IoC Container의 기본 패키지 이다. BeanFactory 인터페이스는 모든 타입의 object를 다룰 수 있는 advanced한 설정 매커니즘을 제공한다. `ApplicationContext는` `BeanFactory의` Sub-Interface 이다. 이것은 
* Spring의 AOP 기능과의 손쉬운 통합
* 메시지 리소스 핸들링(for use in internationalization)
* Event publication
* web application에서 쓰이는 `WebApplicationContext`과 같은 Application 계층 특화 context


간단히 말해 `BeanFactory는` configuration framework 와 기본 기능을 제공하고, `ApplicationContext`는 여기에 enterprise-specific한 기능을 추가해 놓았다. `ApplicationContext` 는 `BeanFactory`의 완전한 Superset 이며, is used exclusively in this chapter in descriptions of Spring’s IoC container. For more information on using the BeanFactory instead of the ApplicationContext, see The BeanFactory.

In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.