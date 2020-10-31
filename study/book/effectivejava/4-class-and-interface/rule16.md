# public 클래스 안에는 public 필드를 두지 말고 접근자 메서드를 사용하라.

단순히 '값'을 나타내는 클래스(쓰레기 클래스 라고 표현하고 있다.) 예를 들어
```java
class Point{
    public double x;
    public double y;
}
```
이런 클래스는 데이터 필드를 직접조작할 수 있어 캡슐화의 이점을 누릴 수없다.(규칙 13) 
* API를 변경하지 않고서는 내부 표현을 변경할 수 없다.
* 불변식(invariant)도 강제할 수 없다.
* 필드를 사용하는 순간에 어떤 동작이 실행되도록 만들 수도 없다.

이런 클래스는 private 필드와 public 접근자 메서드(getter)로, 변경 가능 클래스라면 수정자(mutator) 메서드(setter)도 제공해야 한다.
```java
class Point{
    private double x;
    private double y;

    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() { return x; }
    public double getY() { return y; }

    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }
}
```
이렇게 함으로서 내부 표현을 자유로이 수정할 수 있게 된다.

## 물론 예외사항은 있다. 
package-private 클래스나 private 중첩 클래스(nested class)는 데이터 필드를 공개하더라도 잘못이라 말할 수 없다. 클래스가 추상화하려는 내용을 제대로 기술하기만 한다면 말이다. package-private 클래스의 경우 클래스 내부 표현을 변경하더라도 패키지 외부 코드는 변경되지 않을 것이고, private 중첩 클래스의 경우 그 클래스의 바깥 클래스 외부의 코드는 아무 영향도 받지 않을 것이다.

## 물론 예외사항은 있다. - 2
자바 플랫폼이 제공하는 라이브러리 클래스 가운데는, public 클래스는 필드를 외부에 직접 공개하지 말아야 한다는 원칙을 따르지 않는 것이 몇개 있다.
예를 들면 아래와 같은 클래스다.
```java
package java.awt;

...

public class Point extends Point2D implements java.io.Serializable {
    public int x;
    public int y;

    ... 

    public Point() {
        this(0, 0);
    }

    ...

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
    
    ...
}
```

이런 클래스는 참고하지 않는 편이 좋다.


## 물론 예외사항은 있다. - 3
Public 클래스가 내부 필드르 외부로공개하는 것은 바람직하지 않지만, 변경 불가능 필드는 그 심각성이 좀 덜하다.(정말 이래야 하는지는 의문이지만)
```java
public final class Time {
    private static final int HOURS_PER_DAY = 24;
    private static final int MINUTES_PER_HOUR = 60;

    public final int hour;
    public final int minute;

    public Time(int hour, int minute) {
        if (hour < 0 || hour >= HOURS_PER_DAY)
            throw new IllegalArgumetException("Hour : " + hour);
        if (minute < 0 || minute >= MINUTES_PER_HOUR)
            throw new IllegalArgumetException("Min : " + minute);

        this.hour = hour;
        this.minute = minute;
    }
    ...
}
```

## 요약
* public 클래스는 변경 가능 필드를 외부로 공개하면 안 된다.
* 변경 불가능 필드인 경우에는 외부로공개하더라도 많이 위험하진 않지만, 그럴 필요가 있는지 의문이다.
* 하지만 package-private나 private로 선언된 중첩 클래스의 필드는 그 변경 가능 여부와는 상관없이 외부로 공개하는 것이 바람직할 떄도 있다.