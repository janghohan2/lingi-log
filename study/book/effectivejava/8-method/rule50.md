# 적시에 방어적 복사본을 만들라.
예를들어

```java
class Period {
    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {
        if(start.compareTo(end) > 0) {
            throw new IllegalArgumentException(
                this.start + "가" + this.end + "보다 늦다.");
        }
        this.start = start;
        this.end = end;
    }

    public Date start() {
        return start;
    }

    public Date end() {
        return end;
    }
}
```
이런 클래스가 있을 때, 당연히 `period.end` 가 `period.start` 보다 늦을거라 기대하지만

```java
Date start = new Date();
Date end = new Date();
Period p = new Period(start, end);
period.end().setYear(78);
```
이런 식으로 악의적으로 공격이 가능하다.(`period.start` 가 `period.end` 보다 늦어진다!) 물론, `Date` 말고 불변인 `Instant`(`LocalDateTime`, `ZonedDateTime`)을 사용하면 되지만 기존에 사용하고 있는 곳에서 문제가 생길 수도 있다. 

이런 경우 **방어적 복사** 하여 악의적 공격을 막을 수 있다.

## 방어적 복사
```java
class Period {
    private final Date start;
    private final Date end;

    public Period(Date start, Date end) {
        this.start = new Date(start.getTime());
        this.end = new Date(end.getTime());

        if (this.start.compareTo(this.end) > 0)
            throw new IlligalArgumentException(
                this.start + "가" + this.end + "보다 늦다.");
            )
    }

    public Date getStart(){
        return new Date(start.getTime());
    }

    public Date getEnd(){
        return new Date(end.getTime());
    }
}
```

이렇게 하면 앞서 적은 공격은 물론이고, 
```java
Date start = new Date();
Date end = new Date();
Period period = new Period(start, end);
period.getEnd().setYear(78);
```
이렇게 `getter`로 가져와 하는 공격도 막을 수 있다. 