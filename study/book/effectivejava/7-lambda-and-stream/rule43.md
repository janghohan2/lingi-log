# 람다보다는 메서드 참조를 사용하라.
>메서드 참조는 람다의 간단명료한 대안이 될 수 있다. 메서드 참조 쪽이 짧고 명확하다면 메서드 참조를 쓰고, 그렇지 않을 때만 람다를 쓰자.

## 메서드 참조 유형별 분류
메서드 참조 유형|예|같은 기능을 하는 람다
-|-|-
정적|Integer::parseInt|str -> Integer.parseInt(str)
한정적(인스턴스)|Instant.now()::isAfter|Instant then = Instant.now();<br>t -> then.isAfter(t)
비한정적(인스턴스)|String::toLowerCase|str -> str.toLowerCase()
클래스 생성자|TreeMap\<K, V>::new|() -> new TreeMap\<K, V>
배열 생성자|int[]::new|len -> new int\[len]
