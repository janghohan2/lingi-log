# Template Method Pattern
Template Method Pattern은 Super Class에 알고리즘의 뼈대를 정의하고 자식클래스에서 이를 변경하지 않고 알고리즘을 구현하도록 하는 디자인 패턴으로, Behavior Design Pattern의 한 종류 이다.
## 언제 쓰일까?
Template Method 패턴이 필요한 경우를 예를 들어 살펴보자. 

문서 분석하는 기능을 가진 App을 만든다고 가정해보자. 처음엔 단순하게 DOC 파일을 분석할 수 있도록 구현을 했다. 하지만 다음에 CSV 파일도 처리할 수 있게 해달라는 요구사항이 왔고 CSV 파일을 분석하는 기능을 구현했다. 그런데 더 생각해보자. 나중에 얼마든지 분석할 수 있는 문서 포맷을 추가해 달라는 요구가 들어올 수 있다. 

**그 때마다 문서 형식별 분석기능을 새로 만들것인가?**

분석기능을 수행하는 클래스들을 보면 *소스의 많은 부분이 비슷*하단것을 알 수 있다. 파일을 읽어와 텍스트를 추출하고 텍스트를 분석하여 결과물을 만들고 파일을 닫는 로직의 흐름이 거의 같기 때문이다. 

또한 분석 클래스를 사용하는 Client 입장에서도 문제가 있는건 마찬가지이다. 문서 형식에 따른 적절한 클래스를 찾기 위해 분기문을 작성해야 한다. 문서 형식의 추가 혹은 변경이 일어나면 어김없이 Client도 변경이 일어나야 한다.
## Template Method 패턴 사용
Template Method 패턴에 대해 다시 한번 살펴보자. Template Method Pattern은 Super Class에 알고리즘의 뼈대를 정의하고 자식클래스에서 이를 변경하지 않고 알고리즘을 구현하도록 하는 디자인 패턴이다. 이 패턴을 적절히 사용하면 중복 코드를 없앨 수 있으며 Client쪽 문제도 다형성을 사용해 해결할 수 있다.

## 구조
![templatemethod 구조](https://raw.githubusercontent.com/lingi-log/lingi-log/master/assets/images/study/designpattern/templatemethod_1.png)
### Abstract Class
Abstract Class 에서는 알고리즘의 세부 사항을 선언한다. 그리고 template method 안에 앞서 정의한 알고리즘의 각 세부 사항을 적절히 호출해 알고리즘의 뼈대를 완성한다. 각 세부사항은 abstract 메소드 일 수도 있고 구현해놓은 메소드 일수도 있다.
### Concrete Class
Abstract Class를 상속 받아 template method 제외하고 필요에 따라 메서드를 override 한다.

## 적용하기
1. 대상 알고리즘을 여러 단계로 분리할수 있는지 알아보고, 분리할 수 있다면 공통 로직으로 추출할수 있는지 체크한다.
1. Abstract 클래스를 생성하고 template method와 위에서 분리한 알고리즘의 각 단계를 구현할 메서드를 선언한다. 앞서 알아본것 처럼 공통으로 추출할수 있는 로직은 Abstract에 구현하고 아닌 로직은 추상메서드로 남겨놓는다. 필요에 따라 hook 메서드를 추가해도 된다.
1. template method에 메서드를 적절한순서로 호출하여 알고리즘의 뼈대를 완성한다. 자식클래스에서 override 하지못하도록 template method에 메서드를 final로 선언해도 된다. 
1. 자식 클래스를 생성하고 abstract 메서드를 완성한다. 필요에 따라 Abstract 클래스에 구현된 메서드를 override해도 되고 hook 메서드를 override해도 된다.

## 장단점
### 장점
* 변경으로 인한 사이드이팩트를 최소화하며 커다란 알고리즘의 특정 부분을 override 할 수 있다.
* 코드의 중복을 피할수 있다.
### 딘점
* Client에 따라 알고리즘이 더 세분화되어 쪼개지길 원할 수 있다.
* 알고리즘을 고정시켜놓아 Liskov Substitution Principle을 위반할수 있다.(이건 조 더 찾아봐야할듯..)
* 알고리즘이 세세하게 쪼개지면 관리하기 힘들어진다.