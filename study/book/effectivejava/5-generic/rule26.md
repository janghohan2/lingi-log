# 로 타입은 사용 하지 말라
들어가기 앞서 여기서 사용 하는 용어를 정리하자.
한글용어|영문용어|예|아이템
-|-|-|-
매개변수화 타입|parameterized type|List\<String>|아이템26
실제 타입 매개변수|actual type parameter|String|아이템26
제네릭 타입|generic type|List\<E>|아이템 26, 29
정규 타입 매개변수|formal type parameter|E|아이템 26
비한정적 와일드카드 타입|unbounded wildcard typ|List<?>|아이템26
로 타입|raw type|List|아이템 26
한정적 타입 매개변수|bounded type parameter|\<E extends Number>|아이템 29
재귀적 타입 한정|recursive type bound|/<T extends Comparable<T>>|아이템31
제네릭 메서드|generic method|static \<E> List\<E><br>asList(E[] a)|아이템 30
타입 토큰|type token|String.class|아이템 33

## 로 타입은 사용 하지 말라
로 타입을 쓰면 제네릭이 안겨주는 안정성과 표현력을 모두 잃게 된다. 두 가지 코드를 비교해 보자.

1. 로 타입 사용
    ```java
    // Stamp 인스턴스만 취급 한다.
    private final Collection stamps = ...;

    // 실수로 동전을 넣는다.
    stamps.add(new Coin(...));

    // 런타임에 에러 발생!!
    for (Iterator i = stamps.iterator(); i.hasNext(); ) {
        Stamp stamp = (Stamp) i.next(); //ClassNotFoundException을 던진다)
        stamp.cancel();
    }
    ```

2. 제네릭 사용
    ```java
    private final Collection<Stamp> stamps = ...;

    // 실수로 동전을 넣는다... 컴파일 타임에 에러 발생!!
    stamps.add(new Coin(...));
    ```

오류는 가능한 한 발생 즉시, 이상적으로는 컴파일할 때 발견하는 것이 좋다.\
1번에선 오류가 발생 하고 한참 뒤인 런타임에서야 오류를 발견할 수 있는데, 이렇게 되면 런타임에 문제를 겪는 코드와 원인을 제공한 코드가 물리적으로 상당히 떨어져 있을 가능성이 커진다.\
반면, 2번에선 `stamps`에 Coin을 넣으려 할때 컴파일 에러가 발생하며, 무엇이 잘못됐는 지 정확히 알 수 있다.

## List와 List\<Object>
`List` 같은 로타입은 사용해서는 안 되나, `List<Object>`처럼 임의 객체를 허용하는 매개변수화 타입은 괜찮다. `List`는 제네릭 타입에서 완전히 발을 뺀 것이고, `List<Object>`는 모든 타입을 허용한다고 컴파일러에게 명확히 의사전달을 한 것이다. \
> 제네릭 타입을 쓰고 싶지만 실제 타입 매개변수가 무엇인지 신경쓰고 싶지 않다면 물음표(?)를 사용하자.\
> 두 방식의 특징은 와일드카드 타입은 안전하지만 로 타입은 안전하지 않다. 로 타입 컬렉션엔 아무 원소나 넣을 수 있어 타입 불변식을 훼손하기 쉽고, 와일드카드 타입을 사용하면 null 외에는 어떤 원소도 넣을 순 없다.\
> 단, class 리터럴에는 로 타입을 써야 한다.\
> 단, 로타입이든 비한정적 와일드카드 타입이든 instanceof는 완전히 똑같이 동작하기 때문에 로타입을 쓰는 편이 깔끔하다.(p.159)





```java
o
String.class;
String[].class;
int.class;

x
List<String>.class;
List<?>.class
```


