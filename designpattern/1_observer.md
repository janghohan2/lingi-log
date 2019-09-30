# Observer Pattern
갹체들에게 연락망을 돌립시다~\
먼저 Observer 패턴을 검색해 보면 `Subject`, `Observer`, `Subscribe`라는 용어가 등장 한다. 뭔가 친숙한 느낌인데... 구독자가 신문을 구독하는 매커니즘을 예로 들어 이해해 보자.
## 신문과 구독자
신문을 구독하는 매커니즘을 예로 들어 보면\
출판사가 있고, 영재, 우영, 민영 은 출판사를 구독하고 있고, 장호는 구독하고 있지 않다. 
* 출판사로부터 news가 생성되면 춢판사는 구독자 리스트에 있는 구독자(Observer)에게 news를 전달한다.
![init](/observer_init.png)
* 장호도 신문을 보고 싶어 출판사에 구독 신청을 한다.
![subscribe](/observer_subscribe.png)
* 이제 장호도 출판사를 구독하고 있으므로 news를 전달받는다.
![subscribe_result](/observer_subscribe_result.png)
* news를 보다 실증이 나자 장호는 출판사를 unsubscribe 한다.
![unsubscribe](/observer_unsubscribe.png)
* 출판사는 news가 생성되도 더 이상 장호 신문을 전달하지 않는다.
![init](/observer_init.png)

여기서 몇 가지 개념을 대응시켜 보면\
&nbsp;&nbsp;&nbsp;출판사 : Subject\
&nbsp;&nbsp;&nbsp;구독자 : Observer\
&nbsp;&nbsp;&nbsp;구독하는 행위 : Subscribe\
라고 할 수 있다.

## 정의
옵저버 패턴은 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들한테 연락이 가고 자동으로 내용이 갱신되는 방식으로 일대 다(one-to-many) 의존성을 정의한다.
> 일대 다 관계\
위 그림을 보면 하나의 Subject에 여러 개의 Observer가 등록 되어 있는데, 이런 관계를 일대 다 관계라 한다.

또한, Subject와 Observer는 느슨하게 결합되어 있어, 언제든 옵저버를 새로 추가할 수 있고, 새로운 형식의 옵저버를 추가하려 할 때에도 주제는 전혀 변경할 필요가 없다. 또한 주제와 옵저버는 서로 독립적으로 재사용 할 수 있으며, 주제나 옵저버가 바뀌더라도 서로한테 영향을 주지 않는다
> 느슨한 결합(Loose Coupling)\
두 객체가 느슨하게 결합되어 있다는 것은 그 둘이 상호작용을 하긴 하지만 서로에 대해 잘 모른다는 의미.\
주제가 옵저버에 대해 아는 것은 옵저버가 특정 인터페이스(Observer 인터페이스)를 구현한다는 것 뿐. Observer 인터페이스의 구상 클래스가 무엇인지, 옵저버가 무엇을 하는 지 에 대해서는 알 필요가 없다.
## 구현 방법
Observer 패턴 구현을 위한 클래스 다이어그램은 아래와 같다.\
![class_diagram](/observer_class_diagram.png)

* ### Subject 인터페이스
주제를 나타내는 인터페이스. 객체에서 옵저버로 등록하거나 옵저버 목록에서 탈퇴하고 싶을 때 이 인터페이스에 있는 메소드 사용.
* ### Observer 인터페이스
옵저버가 될 가능성이 있는 객체에서는 반드시 Observer 인터페이스를 구현해야 한다. 이 인터페이스에는 주제의 상태가 바뀌었을 때 호출되는 update() 메소드가  있다.
* ### ConcreteSubject
주제역할을 하는 구상클래스에서는 항상 Subject 인터페이스를 구현해야 한다.
* ### ConcreteObserver
Observer 인터페이스만 구현한다면 무엇이든 옵저버 클래스가 될 수 있다. 각 옵저버는 특정 주제 객체에 등록 해서 연락을 받을 수 있다.

## Obsserver 패턴을 구현한 라이브러리
* ### java.util 패키지 Observable 클래스
* ### JavaBeans
* ### Java Swing
* ### ReactiveX(rxjs, rxjava ... [링크](http://reactivex.io/))
