# Immutable 클래스

예전에 Immutable / Mutable 클래스에 대해서 들었을 땐 그냥 '아 그렇구나' 하고 넘어갔다. 둘 사이의 차이에 대해 깊게 생각해 본 적 없기 때문에 클래스를 만들 때 기본적으로 `@Gettet`, `@Setter` 어노테이션을 붙이고 시작을 했었다. 

그러다 스터디 에서 리뷰 중 `DTO 클래스는 Immutable한게 좋다`는 피드백을 받았고, 최근 제출한 과제에서도 과도한 `Setter`는 좋지 않다는 피드백을 받아 *Effective Java*와 인터넷 에서 Immutable 클래스에 대해 좀 찾아보았다.

## Immutable 클래스란?
Immutable 클래스는 객체를 생성 후 수정할 수 없는 클래스다. Immutable 클래스는 어떤 특징을 가지고 있고 어떻게 하면 만들 수 있는 지, 어디에 사용되는지에 대해 알아보자. 

## 특징
### 단순하다
Immutable 객체는 생성될 때 부여된 한 가지 상태만 갖는다. 또한 생성 시 적절하게 validation을 해준다면 'valid state'를 가지게 된다.
### Thread-safe하다.
필드의 상태가 변경될 일이 없으므로 여러 스레드가 동시에 사용해도 상태가 훼손될 일이 없다.
### 자유롭게 공유 가능하다.
Thread-safe 하므로 자유롭게 공유 가능하다.
### 변경에 적절하게 대응할수 있다.
Immutable 객체의 field는 보통 final과 함게 쓰이는데, 덕분에 변경이 일어났을 때 compiler는 우리에게 경고를 보내줄 수 있다.
### 값마다 별도의 객체를 만들어야 한다.
Immutable 하므로 값마다 새로운 객체를 만들어야 한다. 따라서 객체 생성 비용이 높을 수 있다.

## 생성 방법
### private 접근자
private 접근자를 두면 사용자가 필드에 직접 접근해 변경할 수 없게 된다.
아래와 같이 모든 필드를 `private`로 두면 된다.
```java
public class User{
    private Long id;
    private String name;
}
```
### setter 사용금지
위와 같이 필드의 접근제어자를 private로 설정해 놓아도 setter(mutator)를 만들어 놓는다면 필드의 변경이 가능해 진다. 따라서 Immutable 클래스는 setter를 제공하지 않는다.
### final 사용
final을 사용하면 프로그래머의 의도가 그대로 드러나게 되며, 필드를 변경할 수 없다는 것을 명시적으로 나타내 준다. 하지만 몇몇 경우에는 final로 선언 하였더라도 변경할 수 있는 경우가 있는데
```java
@Getter
public class User{
    private final Long id;
    private final String name;
    private final List<String> nicknames

    public User(Long id, String name, List<String> nicknames){
        if(id == null || id < 0) throw new Exception();
        if(name == null || "".equals(name)) throw new Exception();

        this.id = id;
        this.name = name;
        this.nicknames = nicknames;
    }
}

/*****************************************/
user.getNicknames().add('lingi');
```
이 경우엔 nicknames를 final로 선언하긴 했지만 mutable한 자료형을 사용했기 때문에 nicknames에 새로운 노드를 추가할 수 있다. 따라서 이런 경우엔 새로운 list를 생성하여 값을 복사해서 리턴해 주거나 immutable한 자료형을 사용하여야 한다.
### 상속받지 못하게 한다.
모든 필드를 immutable하게 만들어도 상속을 할 수 있으면 상속받은 하위 클래스가 객체 상태가 변경된 것처럼 동작해서 Immutable한 상태를 깨뜨릴 수 있다. 상속을 막기 위해 아래와 같이 final 키워드를 사용할 수 있다.
```java
@Getter
public final class User{
    ...
}
```
### private 생성자와 정적팩토리 메서드 사용
객체의 성격에 따라 여러 validation을 해야 하는 경우가 있다. 위에서 예를 든 User클래스의 경우, 임시 User의 경우 아직 'id'나 'nickname'이 없이 생성될 수 있다. 이럴 경우 파라미터에 `null`을 넘기기 보단, 정적팩토리 메서드를 이용해 
```java
@Getter
public class User{
    private final Long id;
    private final String name;
    private final List<String> nicknames

    private User(Long id, String name, List<String> nicknames){
        this.id = id;
        this.name = name;
        this.nicknames = nicknames;
    }

    public static User existingUser(Long id, String name, List<String> nicknames){
        if(id == null || id < 0) throw new Exception();
        if(name == null || "".equals(name)) throw new Exception();

        return new User(id, name, nicknames);
    }

    public static User temporaryUser(String name){
        if(name == null || "".equals(name)) throw new Exception();
        return new User(null, name, null);
    }
}
```
이런식으로 이미 존재하는 user를 생성할 땐 `existingUser`, 임시 user를 생성할 땐 `temporaryUser`를 사용하여 서로 다른 validation을 적용해 객체를 생성할 수 있다.
### Optional 필드를 적절히 사용
여러 이유에서 필드에 null값이 들어갈 수 있다. 이때 그 값을 그냥 가져와 사용한다면 NullPointerException이 발생할 수 있다. 이럴 경우엔 `Optional`을 적절히 사용해 주면 된다. User 클래스의 id 필드를 예로 들면
```java
public class User{
    private final Long id;
    @Getter
    private final String name;
    @Getter
    private final List<String> nicknames

    public Optional<Long> getId(){
        return Optional.ofNullable(id);
    }
}
```
이런식으로 선언해 놓으면 User 클래스 사용자는 Optional 필드를 보고 필드의 용도/의도를 파악하여 사용할 수 있다. 하지만 필드를 Optional으로 선언하는 것은 좋지 않은 방법인데, 필드에 null값이 들어갈 수 있기 때문이다.

> #### 모든 클래스를 불변으로 만들 수는 없다.
> 다만, 그런 클래스 라도 **변경할 수 있는 부분을 최소한**으로 줄이자. 객체가 가질 수 있는 상태의 수를 줄이면 그 객체를 예측하기 쉬워지고 오류가 생길 가능성이 줄어든다.

## 사용되는 곳
### Concurrency 프로그래밍
* Multi Thread 프로그래밍을 한다면 여러 Thread에서 접근하는 객체는 Immutable하게 두는것이 좋다.
* Concurrency code에서 mutable한 object는 꼭 필요한 경우에만 사용해야 한다.
### Value Object(VO)
* VO는 특정 '값'을 나타내기 때문에 변하면 안된다.
    * Long, Integer 같은 java의 wrapper 클래스
    * Money
    * Weight
    * Name\
    ...
### Data Transfer Object(DTO)
* DTO는 서로 다른 component나 서로 다른 system 사이에 데이터를 전송해주는 객체이다.
* DTO는 꼭 Immutable할 필요는 없지만 Immutable 하게, 혹은 거의 Immutable하게 만듦으로서 얻을 수 있는 장점이 있다.
    * Debugging 용이, 유지보수 용이.
    * DTO가 mutable 하다면 DTO가 여러 component의 수많은 코드를 거치며 값이 변경될 수 있고, 이로 인해 에러가 발생하면 찾기가 어렵게 된다.