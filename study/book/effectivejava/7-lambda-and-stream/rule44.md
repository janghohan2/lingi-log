# 표준 함수형 인터페이스를 사용하라
* 필요한 용도에 밎는 게 있다면 , 직접 구현하지 말고 표준 함수형 인터페이스를 사용하라
* 기본 함수형 인터페이스에 박싱된 기본 타입을 넣어 사용하지 말자
    * 표준 함수형 인터페이스 대부분 기본 타입만 지원함.
    * 계산량 많을 때 성능이 처참히 느려질 수 있다.
* 직접 만든 함수형 인터페이스에는 항상 `@FunctionalInterface`애너테이션을 사용하라

## 함수형 인터페이스
함수형 인터페이스|함수 시그니처|설명|예
-|-|-|-
java.lang.Runnerble|void run()|매개변수도 없고 반환값도 없음
Supplier\<T>|T get()|매개변수는 없고 반환값만 있음|Instant::now
Consumer\<T>|void accept(T t)|Supplier와 반대로 매개변수만 있고, 반환값이 없음|System.out::println
Function\<T, R>|R apply(T t)|일반적인 함수. 하나의 매개변수를 받아서 결과를 반환|Arrays::asList
Predicate\<T>|booean test(T t)|조건식을 표현하는데 사용됨. 매개변수는 하나, 반환 타입은 boolean|Colection:isEmpty
BiConsumer\<T, U>|void accept(T t, U u)|두개의 매개변수만 있고, 반환값이 없음
BiPredicate\<T, U>|boolean test(T t, U u)|조건식을 표현하는데 사용됨. 매개변수는 둘, 반환겂은 boolean
BiFunction\<T, U, R>|R apply(T t, U u)|두 개의 매개변수를 받아서 하나의 결과를 반환
UnaryOperator\<T>|T apply(T t)|Function의 자손, Function과 달리 매개변수와 결과의 타입이 같다.|String::toLowerCase
BinaryOperator\<T>|T apply(T t, T t)|BiFunction의 자손, BiFunction과 달리 매개변수와 결과의 타입이 같다.|BigInteger::add

## Collection Framework과 함수형 인터페이스

인터페이스|메서드|설명
-|-|-
Collection|boolean removeIf(Predicate\<E> filter)|조건에 맞는 요소를 삭제
List|void replaceAll(UnaryOperator\<E> operator)|모든 요소를 변환하여 대체
Iterable|void forEach(Consumer\<T>  action)|모든 요소에 작업 action을 수행
Map|V compute(K key, BiFunction<K,V,V> f)|지정된 키의 값에 작업 f를 수행
||V computeIfAbsent(K key, Function\<K, V> f)|키가 없으면, 작업 f 수행 후 추가
||V computeIfPresent(K key, BiFunction\<K, V, V> f)|지정된 키가 있을 때, 작업 f 수행
||V merge(K key, V value, BiFunction\<V, V, V> f f)|모든 요소에 병합작업 f를 수행
||void forEach(BiConsumer\<K, V> action)|모든 요소에 작업 action을 수행
||void replaceAll(BiFunction\<K, V, V> f)|모든 요소에 치환작업 f 를 수행

