# 이왕이면 제네릭 메서드로 만들라
클라이언트에서 입력 매개변수와 반환값을 명시적으로 형변환하는 메서드보다 제네릭 메서드가 더 안전하며 사용하기도 쉽다.

## 적용 예시 1 - 제네릭 적용
예를 들어
```java
public static Set union(Set s1, Set s2) {
    Set result = new HashSet(s1);
    result.addAll(s2);
    return result;
}
```
이 소스는 컴파일은 되지만 경고가 발생한다.
```log
Union.java:5: warning: [unchecked] unchecked call to HashSet(Collection<? extends E>) as a member of raw type HashSet
    Set result = new HashSet(s1);
                 ^
Union.java:6: warning: [unchecked] unchecked call to addAll(Collection<? extends E>) as a member of raw type Set
    result.addAll(s2)
                 ^
```

경고를 없애려면 메서드를 타입 안전하게 만들어야 한다.
```java
public static <E> Set<E> union(Set<E> s1, Set<E> s2) {
    Set<E> result = new HashSet<>(s1);
    result.add(s2);
    return result;
}
```
이 메서드는 이제 경고 없이 컴파일 되고, 타입 안전하고 쓰기도 쉽다. 한정적 와일드카드 타입을 사용하면 더 유연하게 개선할 수 있다.

## 적용 예시 2 - 정적팩터리 메서드
때때로 불변 객체를 여러 타입으로 활용할 수 있게 만들어야 할 때가 있는데, 그럴땐  정적팩터리 메서드를 활용해주면 된다.
* ### Collections.reverseOrder
```java
public static <T> Comparator<T> reverseOrder() {
    return (Comparator<T>) ReverseComparator.REVERSE_ORDER;
}
```

* ### Collections.emptySet
```java
public static final <T> Set<T> emptySet() {
    return (Set<T>) EMPTY_SET;
}
```

## 적용 예시 3 - 항등함수를 만들어보자
```java
private static UnaryOperator<Object> IDENTITY_FN = (t) -> t;

@SupressWarnings("unchecked")
public static <T> UnaryOperator<T> identifyFunction() {
    return (UnaryOperator<T>) IDENTIFY_FN;
}
```
자바는 소거방식을 이용하므로 타입이 많더라도 하나만 만들면 된다. 아래와 같이 사용 할 수 있다. **형변환을 하지 않아도 컴파일 오류나 경고가 발생하지 않는다**.
```java
public static void main(String[] args) {
    String[] strings = {"삼베", "대마", "나일론"};
    UnaryOperator<String> sameString = identifyFunction();
    for(string s : strings)
        System.out.println(sameString.apply(s));

    Number[] numbers = {1, 2.0, 3L};
    UnaryOperator<Number> sameNumber = identifyFunction();
    for(Number n : numbers)
        System.out.println(sameNumber.apply(n));
}
```
## 적용 예시 4 - 재귀적 타입 한정
자기 자신이 들어간 표현식을 사용하여 타입 매개변수의 표현 범위를 한정할 수 있다. 재귀적 타입 한정은 주로 타입의 자연적 순서를 정하는 `Comparable` 인터페이스와 함께 쓰인다.
```java
public interface Comparable<T> {
    int compareTo(T o);
}
```
여기서 타입 매개변수 `<T>`는 `Comparable<T>`를 구현한 타이이 비교할 수 있는 원소의 타입을 정의한다.

```java
public static <E extends Comparable<E>> E max(Collection<E> c) {
    if (c.isEmpty())
        throw new IllegalArgumentException("컬렉션이 비어 있습니다.");
    
    E result = null;
    for (E e : c)
        if (result == null || e.compareTo(result) > 0)
            result Object.requireNonNull(e);
    
    return result;
}
```

이렇게 구현하면 컴파일 오류나 경고가 발생하지 않는다.