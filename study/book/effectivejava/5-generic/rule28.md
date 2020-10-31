# 배열보다는 리스트를 사용하라.
## 배열과 리스트의 차이점.
* ### 배열은 공변, 제네릭은 불공변
    ```java
    Object[] objectArray = new Long[1];
    objectArray[0] = "타입이 달라 넣을 수 없다"; // 런타임에 실패

    List<Object> ol = new ArrayList<Long>(); // 호환되지 않는 타입
    ol.add("타입이 달라 넣을 수 없다.");
    ```
    배열은 실수를 런타임에야 알 수 있다.

* ### 배열은 실체화 된다.
    * 배열은 런타임에도 자신이 딤기로 한 원소 타입을 인지하고 확인한다.
    * 반면 제네릭은 타입 정보가 런타임에는 소거된다. 컴파일 타임에만 원소 타입을 검사하며, 런타임엔 원소의 타입을 알수조차 없다.

## 제네릭 배열을 막은 이유?
타입이 안전하지 않기 때문
```java
List<String>[] stringLists = new List<String>[1];   // (1)
List<Integer> intList = List.of(42);                // (2)
Object[] objects = stringList                       // (3)
objects[0] = intList;                               // (4)
String s = stringLists[0].get(0);                   // (5)
```
(1)이 허용된다 가정\
(2)는 원소가 하나인 List<Integer>를 생성 함.\
(3)은 (1)에서 생성한 List<String>의 배열을 Objects 배열에 할당. 배열은 공변이니 아무 문제 없다.\
(4)는 (2)에서 생성한 List<Integer>의 인스턴스를 Object 배열의 첫 원소로 저장. 제네릭은 소거방식으로 동작하기 때문에 문제 없음.\
(5)는 stringLists의 처음 리스트에서 첫 원소를 꺼내려 한다. 컴파일러는 꺼낸 원소를 자동으로 String으로 형변환 하려 하는데, 이 원소는 Integer이므로 런타임에 ClassCastException이 난다.

==> 이런 일을 방지하려면 제네릭 배열이 생성되지 않도록 (1)에서 컴파일 오류를 내야 한다.

## 제네릭과 배열을 섞어 쓰는것은 아예 불가능한가?
* 가능! 아이템 33, 아이템 32 참고!
* 배열로 형변환 할때 제네릭 배열 생성 오류나 비검사 형변환 경고가 뜨는 경우 대부분은 배열인 `E[]` 대신 컬렉션인 `List<E>`를 사용하면 해결 됨.
    * 코드가 조금 복잡해 지고, 성능이 조금 나빠질 수 있음.
    * 타입 안정성과 상호 운용성은 좋아진다.
* ### 적용 예시
    예를 들어 아래와 같은 클래스는
    ```java
    public class Chooser {
        private final Object[] choiceArray;
        
        public Chooser(Collection choices) {
            this.choiceArray = choices.toArray();
        }
        
        // 매번 형변환이 필요하며, 런타임에 형변환 오류가 날 가능성이 있다.
        public Object choose() {
            Random rnd = ThreadLocalRandom.current();
            return choiceArray[rnd.nextInt(choiceArray.length)];
        }
    }
    ```
    `choose`를 사용할 때 매번 형변환이 필요하며, 런타임에 형변환 오류가 날 가능성이 있다. 제네릭을 사용하기 위해 아래와 같이 변경을 한다면

    ```java
    public class Chooser<T> {
        private final T[] choiceArray;

        public Chooser(Collection<T> choices) {
            // incompatible types: java.lang.Object[] cannot be converted to T[]
            this.choiceArray = choices.toArray();
        }

        // choose 메소드는 동일하다.
    }
    ```
    `incompatible types: java.lang.Object[] cannot be converted to T[]` 이런 에러가 나는데
    ```java
    // Object 배열을 T 배열로 형변환.
    this.choiceArray = (T[]) choices.toArray();
    ```
    Object 배열을 T 배열로 형변환 해주면 해결 가능 하다.

    **이렇게**
    ```java
    public class Chooser<T> {
        private final T[] choiceArray;

        public Chooser(Collection<T> choices) {
            // warning: [unchecked] unchecked cast
            this.choiceArray = (T) choices.toArray();
        }

        // choose 메소드는 동일하다.
    }
    ```
    하지만 `warning: [unchecked] unchecked cast` 이런 워닝이 뜬다. T가 무슨 타입인지 알 수 없으니 컴파일러는 이 형변환이 런타임에도 안전한지 보장할 수 없다는 얘기다.(제네릭에서는 원소 타입 정보가 소거되어 런타임에는 무슨 타입인지 알 수 없음!)

    어노테이션을 달아 경고를 숨길 수도 있지만 배열 대신 리스트를 사용해도 경고를 제거할 수 있다.
    ```java
    class Chooser<T> {
        private final List<T> choiceList;

        public Chooser(Collection<T> choices) {
            this.choiceList = new ArrayList<>(choices);
        }

        public T choose() {
            Random rnd = ThreadLocalRandom.current();
            return choiceList.get(rnd.nextInt(choiceList.size()));
        }
    }
    ```
