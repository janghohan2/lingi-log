# 태그 달린 클래스보다는 클래스 계층구조를 활용하라

```java
class Figure {
    enum Shape { RECTANGLE, CIRCLE };
    
    final Shape shape;

    ...

}
```
이런 식으로 현재 표현하는 의미를 태그값으로 표현.

## 태그 달린 클래스는 단점이 한가득
* 열거 타입 선언, 태그 필드, switch문 등 쓸데 없는 코드가 많음.
* 여러 구현이 한 클래스에 혼합돼 있ㅇ서 가독성도 나쁨.
* 다른 의미를 위한 코드도 언제나 함께 하니 메모리도 많이 사용함.
* 필드 들을 final로 선언 하려면 해당 의미에 쓰이지 않는 필드까지 생성자에서 초기화해야 함.
*  또 다른 의미를 추가하려면 코드를 수정해야 함.

==> 태그 달린 클래스는 장황하고, 오류를 내기 쉽고, 비효율적이다.

## 대안
클래스 계층구조로 바꾸자!

계층구조의 루트(root)가 될 추상클래스를 정의하고, 태그 값에 따라 동작이 달라지는 메서드들을 루트 클래스의 추상 메서드로 선언

## 이렇게 바꾸자
```java
abstract class Figure {
    abstract double area();
}

class Circle extends Figure {
    final double radius;

    Circle(double radius) { this.radius = radius; }

    @Override double area() { return Math.PI * (radius * radius); }
}

class Rectangle extends Figure {
    final double length;
    final double width;

    Rectangle(double length, double width) { 
        this.length = length; 
        this.width = width; 
    }

    @Override double area() { return length * width; }
}
```
태그달린 클래스의 단점이 모두 사라짐.
* 간결하고 명확
* 쓸데 없는 코드 모두 사라짐
* 각 의미를 독립된 클래스에 담아 관련 없는 데이터 필드 모두 제거.
* final 필드만 살아남음.
* 개발자의 실수가 일어날 가능성이 줄어듬.

## 정리
태그 달린 클래스를 써야 하는 상황은 거의 없다. 새로운 클래스를 작성하는 데 태그 필드가 등장한다면 태그를 없애고 계층구조로 대체하는 방법을 생각해 보자. 기존 클래스가 태그 필드를 사용하고 있다면 계층구조로 리팩터링하는 걸 고민해 보자.
