# 한정적 와일드카드를 사용해 API 유연성을 높이라
> 조금 복잡하더라도 와일드카드 타입을 적용하면 API가 훨씬 유연해진다. 그러니 널리 쓰일 라이브러리를 작성한다면 반드시 와일드카드 타입을 적절히 사용해줘야 한다. `PECS` 공식을 기억하자. 즉, 생산자(producer)는 wxtends를 소비자(consumer)는 super를 사용한다 Comparable과 Comparator는 모두 소비자라는 사실도 잊지 말자.

매개변수화 타입은 불공변이다. 다시 말해 `List<String>`은 `List<Object>`의 하위타입이 아니라는 것이다. 하지만 때론 불공변 방식보다 유연한 무언가가 필요할 때가 있다. 

자바에선 이럴때 `한정적 와일드카드 타입`이라는 특별한 매개변수화 타입을 지원한다. 소스코드를 보고 비교를 해보면
## 비교
### 1. 매개변수화 타입만 사용
```java
public void pushAll(Iterable<E> src) {
    for (E e : src)
        push(e);
}

public void popAll(Collection<E> dst) {
    while(!isEmpty())
        dst.add(pop());
}

////////////////////////////////////////////

Stack<Number> numberStack = new Stack<>();

Iterable<Integer> integers = ...;
// 에러 발생! Iterable<Integer>를 Iterable<Number>로 변환할 수 없다.
numberStack.pushAll(integers);

Collection<Object> objects = ...;
// 에러 발생! Collection<Object>는 Collection<Number>의 하위타입이 아니다.
numberStack.popAll(objects)
```
### 2. 한정적 와일드카드 타입 적용
```java
public void pushAll(Iterable<E> src) {
    for (E e : src)
        push(e);
}

public void popAll(Collection<E> dst) {
    while(!isEmpty())
        dst.add(pop());
}

////////////////////////////////////////////


public void pushAll(Iterable<? extends E> src) {
    for (E e : src)
        push(e);
}

public void popAll(Collection<? super E> dst) {
    while(!isEmpty())
        dst.add(pop());
}
```

매개변수화 타입만 사용했을 땐 에러가 발생하지만 한정적 와일드카드를 사용하면 에러 없이 사용 가능하다.

## 유연성을 극대화 하려면 
* 유연성을 극대화하려면 원소의 생산자나 소비자용 입력 매개변수에 와일드카드 타입을 사용해야 한다.
* PECS(producer-extends, consumer-super)
    * 매개변수화 타입 T가 생산자라면 `<? extends T>`를 사용하고, 소비자라면 `<? super T>`를 사용하라. 
    * 예시
    ```java
    public Chooser(Collection<T> choices)

    public Chooser(Collecrion<? extends T> choices)
    ```

    ```java
    public static <E> set<E> union(Set<E> s1, Set<E> s2)

    public static <E> Set<E> union(Set<? extends E> s1, Set<? extends E> s2)
    // 자바 7 까지는 명시적 타입 인수를 사용해야 한다.
    
    // Set<Integer> integers = Set.of(1, 3, 5);
    // Set<Double> doubles = Set.of(2.0, 4.0, 6.0);

    // Set<Number> numbers = Union.<Number>union(integers, doubles);
    ```

    ```java
    public static <E extends Comparable<E>> E max(List<E> list)

    public static <E extends Comparable<? super E>> E max(List<? extends E> list)
    ```
    * 입력 매개변수에서는 E 인스턴스를 생산하므로 원래의 `List<E>`를 `List<? extends E>`로 수정했다.
    * `Comparable<E>`는 E 인스턴스를 소비한다(그리고 선후 관계를 의미하는 정수를 생산한다).
        * 그래서 매개변수화 타입`Comparable<E>`를 한정적 와일드카드 타입인 `Comparable<? super E>`로 대체함.
    * `Comparable`(혹은 `Comparator`)을 직접 구현하지 않고, 직접 구현한 다른 타입을 확장한 타입을 지원하기 위해 와일드카드가 필요.
    * 반환 타입에는 한정적 와일드카드 타입을 사용하면 안 된다. 유연성을 높여주지도 않고, 클라이언트에 까지 와일드카드 타입을 써야 하기 때문이다.
        * 클래스 사용자가 와일드카드 타입을 신경써야 한다면 그 API에 무슨 문제가 있을 가능성이 크다.
## 타입 매개변수와 와일드카드 중 어떤것을 사용해야 할까?
* 기본 규칙은 **메서드 선언에 타입 매개변수가 한 번만 나오면 와일드카드로 대체하라.**
    * 비한정적 타입 매개변수라면 비한정적 와일드카드로
    * 한정적 타입 매개변수라면 한정적 와일드카드로
* 문제상황?
```java
public static void swap(List<?> list, int i, int j) {
    list.set(i, list.set(j, list.get(i)));
}
```
이 코드를 컴파일 하면 그다지 도움이 되지 않는 오류 메시지가 나온다.
=> List<?>에는 null 외에는 어떤 값도 넣을 수 없기 때문.
=> 타입을 알려주는 도우미 메서드를 작성하자!
```java
public static void swap(List<?> list, int i, int j) {
    swapHelper(list, i, j);
}

public static <E> void swapHelper(List<E> list, int i, int j) {
    lst.set(i, list.set(j, list.get(i)));
}
```
=> `swapHelper` 메서드는 리스트가 `List<E>`임을 알고 있다. 

다소 복잡하게 구현했지만 외부에서는 와일드카드 기반의 멋진 선언을 유지할 수 있다.