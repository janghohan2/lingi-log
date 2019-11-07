# Proxy Pattern
Proxy패턴은 Structural Design Pattern(클래스나 객체를 조합해 더 큰 구조를 만드는 패턴)으로, 원본 객체에 대한 요청 앞, 뒤로 무언가를 수행할 수 있도록 해 준다.
https://refactoring.guru/design-patterns/proxy
## 필요성에 대해.
왜 객체에 대한 접근을 제어해야 할까? 예를 들어 보자.\
많은 양의 시스템 리소스를 잡아먹는 방대한 양의 Object가 있다고 해 보자. 이 객체에 접근하는 Client들은 이 객체를 항상 필요로 하는 것이 아니라 가끔씩 필요로 한다.\
그래서 Client들은 Lazy Initialization(필요할 때 생성) Code를 실행해야 하는데, 이때 상당히 많은 코드의 중복이 발생할 수 있다.\
이상적으로는 Object 클래스에 이 로직을 집어넣는다면 좋겠지만, 현실은 불가능할 때가 많다. 예를들어 closed 3rd-party 라이브러리의 클래스를 사용할 때 그렇다.
## 어떻게 해결할까?
Proxy 패턴을 적용해 보자.
* Origin Service Object와 같은 interface를 구현한 proxy 클래스를 생성
* 모든 clients가 proxy에 접근하도록 한다.
* proxy는 client로 부터 요청을 받으면 Origin Service Object를 생성하고, 모든 작업을 위임한다.

이렇게 함으로서 얻을 수 있는 장점은 다음과 같다.
* Origin Service Object의 로직을 실행하기 전, 후에 무언가 작업을 하고 싶을 때 Origin Service Object 의 변경 없이 작업이 가능하다.


