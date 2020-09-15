# 멤버 클래스는 되도록 static으로 만들라
중첩 클래스의 종류는 
* 정적 멤버 클래스
* 비정적 멤버 클래스
* 익명 클래스
* 지역 클래스

이렇게 네가지가 있다. 이 네 종류의 클래스들은 모두 쓰임새가 다르다.

## 언제 어떤 클래스를 사용해야 하나?
* 메서드 밖에서도 사용해야 하거나 메서드 안에 정의하기 너무 길다? => 멤버클래스로 만든다.
    * 멤버클래스의 인스턴스 각각이 바깥 인스턴스를 참조한다면? => 비정적
    * 멤버클래스의 인스턴스 각각이 바깥 인스턴스를 참조하지 않으면? => 정적
* 한 메서드 안에서만 쓰이고, 인스턴스를 생성 하는 곳이 한곳, 해당 타입으로 쓰기 적절한 클래스나 인터페이스가 있다? => 익명 클래스
* 그렇지 않다면 지역클래스

## 각 클래스 특징 정리
### 정적 멤버 클래스
정적 멤버 클래스는 다른 클래스 안에서 선언되고, 바깥 클래스의 `private` 멤버에도 접근할 수 있다. 나머지는 일반 클래스와 같다.

* 개념상 중첩 클래스의 인스턴스가 바깥 인스턴스와 독립적으로 존재할 수 있다면 정적 멤버클래스로 만들어야 한다.
* 멤버클래스에서 바깥 인스턴스에 접근할 일이 없다면 무조건 `static`을 붙여서 정적 멤버 클래스로 만들자.
    ```java
    public class OuterClass {
        void outerClassMethod() {

        }

        private static class StaticInnerClass{
            void innerClassMethod() {
    //            OuterClass.this.outerClassMethod(); // 에러
    //            outerClassMethod(); // 에러
            }
        }
    }
    ```
    * `InnerClass`에서 `OuterClass`를 참조하려 하면 에러 발생 함!
* `static`을 생략하면 바깥 인스턴스로의 숨은 외부참조를 가지게 되고, 이 참조를 저장하려면 시간과 공간이 소비된다.
* 가비지 컬렉션이 바깥 클래스의 인스턴스를 수거하지 못하는 경우가 생길 수 있다.
* 바깥 클래스가 표현하는 객체의 한 부분을 나타내는데 사용 함.
    - map을 예로 들어 생각할 수 있다.
    - 많은 map 구현체들은 각각의 키-값 쌍을 표현하는 엔트리 객체를 가지고 있다.
    - 모든 엔트리는 맵과 연관을 가지고 있지만, 엔트리의 메서드들은 맵을 직접 사용하지 않는다.
    - 따라서 private 정적멤버 클래스가 가장 알맞다.
* 멤버클래스가 공개된 클래스의 `public`이나 `protected` 멤버라면 정적이냐 아니냐는 두배로 중요해 진다.
* 멤버클래스도 역시 공개API가 되어 향후 `release`에서 `static`을 붙이면 호환성이 깨질 수 있다.

#### 정적 멤버 클래스 예시
```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {

    ...

    // 사용하는 곳
    @Override
    public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction) {
        if (remappingFunction == null)
            throw new NullPointerException();
        int hash = hash(key);
        Node<K,V>[] tab; Node<K,V> first; int n, i;
        int binCount = 0;
        TreeNode<K,V> t = null;
        Node<K,V> old = null;
        if (size > threshold || (tab = table) == null ||
            (n = tab.length) == 0)
            n = (tab = resize()).length;
        if ((first = tab[i = (n - 1) & hash]) != null) {
            if (first instanceof TreeNode)
                old = (t = (TreeNode<K,V>)first).getTreeNode(hash, key);
            else {
                Node<K,V> e = first; K k;
                do {
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k)))) {
                        old = e;
                        break;
                    }
                    ++binCount;
                } while ((e = e.next) != null);
            }
        }

        ...
    }

    // 사용하는 곳
    TreeNode<K,V> replacementTreeNode(Node<K,V> p, Node<K,V> next) {
        return new TreeNode<>(p.hash, p.key, p.value, next);
    }

    ...    

    /**
     * Entry for Tree bins. Extends LinkedHashMap.Entry (which in turn
     * extends Node) so can be used as extension of either regular or
     * linked node.
     */
    static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
        TreeNode<K,V> parent;  // red-black tree links
        TreeNode<K,V> left;
        TreeNode<K,V> right;
        TreeNode<K,V> prev;    // needed to unlink next upon deletion
        boolean red;
        TreeNode(int hash, K key, V val, Node<K,V> next) {
            super(hash, key, val, next);
        }

        /**
         * Returns root of tree containing this node.
         */
        final TreeNode<K,V> root() {
            ...
        }

        /**
         * Ensures that the given root is the first node of its bin.
         */
        static <K,V> void moveRootToFront(Node<K,V>[] tab, TreeNode<K,V> root) {
            ...
        }

        /**
         * Finds the node starting at root p with the given hash and key.
         * The kc argument caches comparableClassFor(key) upon first use
         * comparing keys.
         */
        final TreeNode<K,V> find(int h, Object k, Class<?> kc) {
            ...
        }

        /**
         * Calls find for root node.
         */
        final TreeNode<K,V> getTreeNode(int h, Object k) {
            return ((parent != null) ? root() : this).find(h, k, null);
        }

        /**
         * Tie-breaking utility for ordering insertions when equal
         * hashCodes and non-comparable. We don't require a total
         * order, just a consistent insertion rule to maintain
         * equivalence across rebalancings. Tie-breaking further than
         * necessary simplifies testing a bit.
         */
        static int tieBreakOrder(Object a, Object b) {
            ...
        }

        /**
         * Forms tree of the nodes linked from this node.
         */
        final void treeify(Node<K,V>[] tab) {
            ...
        }

        /**
         * Returns a list of non-TreeNodes replacing those linked from
         * this node.
         */
        final Node<K,V> untreeify(HashMap<K,V> map) {
            ...
        }

        /**
         * Tree version of putVal.
         */
        final TreeNode<K,V> putTreeVal(HashMap<K,V> map, Node<K,V>[] tab,
                                       int h, K k, V v) {
            ...
        }

        /**
         * Removes the given node, that must be present before this call.
         * This is messier than typical red-black deletion code because we
         * cannot swap the contents of an interior node with a leaf
         * successor that is pinned by "next" pointers that are accessible
         * independently during traversal. So instead we swap the tree
         * linkages. If the current tree appears to have too few nodes,
         * the bin is converted back to a plain bin. (The test triggers
         * somewhere between 2 and 6 nodes, depending on tree structure).
         */
        final void removeTreeNode(HashMap<K,V> map, Node<K,V>[] tab,
                                  boolean movable) {
            ...
        }

        /**
         * Splits nodes in a tree bin into lower and upper tree bins,
         * or untreeifies if now too small. Called only from resize;
         * see above discussion about split bits and indices.
         *
         * @param map the map
         * @param tab the table for recording bin heads
         * @param index the index of the table being split
         * @param bit the bit of hash to split on
         */
        final void split(HashMap<K,V> map, Node<K,V>[] tab, int index, int bit) {
            ...
        }

        /* ------------------------------------------------------------ */
        // Red-black tree methods, all adapted from CLR

        static <K,V> TreeNode<K,V> rotateLeft(TreeNode<K,V> root,
                                              TreeNode<K,V> p) {
            ...
        }

        static <K,V> TreeNode<K,V> balanceInsertion(TreeNode<K,V> root,
                                                    TreeNode<K,V> x) {
            ...
        }

        static <K,V> TreeNode<K,V> balanceDeletion(TreeNode<K,V> root,
                                                   TreeNode<K,V> x) {
            ...
        }

        /**
         * Recursive invariant check
         */
        static <K,V> boolean checkInvariants(TreeNode<K,V> t) {
            ...
        }
    }
}
```


### 비정적 멤버 클래스
정적 멤버 클래스와 구문상의 차이는 단지 `static`이 붙었나 차이 뿐이지만 의미상으론 꽤 큰 차이를 가진다.

* 비정적 멤버클래스의 인스턴스는 바깥클래스의 인스턴스와 암묵적으로 연결된다.
* 그래서 비정적 멤버클래스의 인스턴스 메서드에서 정규화된 this를 사용해 바깥 인스턴스의 메서드를 호출하거나 바깥 인스턴스의 참조를 가져올 수 있다.
* 정규화된 this란 클래스명.this 형태로 바깥클래스의 이름을 명시하는 용법을 말한다.(?)
* 비정적멤버클래스는 바깥인스턴스 없이는 생성할 수 없다.
* 비정적 멤버 클래스의 인스턴스와 바깥 인스턴스 사이의 관계는 멤버 클래스가 인스턴스화될 때 확립되며, 더 이상 변경할 수 없다.
* 이 관계는 바깥클래스의 인스턴스 메서드에서 비정적클래스의 생성자를 호출할 때 자동으로 만들어지는 게 보통이지만, 드물게는 직접 호출해 수동으로 만들기도 한다.(p.147)
* 이 관계정보는 비정적 멤버클래스의 인스턴스 안에 만들어져 메모리 공간을 차지하고, 생성 시간도 더 걸린다.
#### 비정적 클래스 예시
```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
    
    ...

    // 사용하느 곳
    public Set<Map.Entry<K,V>> entrySet() {
        Set<Map.Entry<K,V>> es;
        return (es = entrySet) == null ? (entrySet = new EntrySet()) : es;
    }
    
    final class EntrySet extends AbstractSet<Map.Entry<K,V>> {
        public final int size()                                { return size; }
        public final void clear()                              { HashMap.this.clear(); } // ?? 무슨 의미지??
        public final Iterator<Map.Entry<K,V>> iterator()       { return new EntryIterator(); }
        public final boolean contains(Object o)                {  ...  }
        public final boolean remove(Object o)                  {  
            if (o instanceof Map.Entry) {
                Map.Entry<?,?> e = (Map.Entry<?,?>) o;
                Object key = e.getKey();
                Object value = e.getValue();
                // removeNode 는 외부 클래스의 메서드
                return removeNode(hash(key), key, value, true, true) != null;
            }
            return false;
        }
        public final Spliterator<Map.Entry<K,V>> spliterator() {  ...  }
        public final void forEach(Consumer<? super Map.Entry<K,V>> action) {  ...  }
    }

    ...

}
```
### 익명클래스
* 익명클래스는 이름이 없다
* 또한 바깥 클래스의 멤버도 아님.
* 그리고 오직 비정적인 문맥에서 사용될 때만 바깥 클래스의 인스턴스를 참조할 수 있다.
* 정적 문백에서 상수변수 이외의 정적 멤버는 가질 수 없다.
* 선언한 지점에서만 인스턴스를 만들 수 있다.
* instanceof 검사나 클래스 이름이 필요한 작업은 할 수 없음.
* 여러 인터페이스를 구현할 수 없고
* 인터페이스를 구현하는 동시에 다른 클래스를 상속할 수도 없다.
* 익명클래스를 사용하는 클라이언트는 그 익명클래스가 상위타입에서 상속한 멤버 외에는 호출할 수 없다.
* 가독성을 위해 짧게
* 자바 람다가 익명클래스의 자리를 차지하게 됨.
* 정적 팩터리 메서드 구현할 때 쓰임.

### 지역클래스
* 네 가지 중첩 클래스 중 가장 드물게 사용 됨.
* 지역변수를 선언할 수 있는 곳 어디나 선택 가능
* 유효범위도 지역변수와 같다.
* 멤버클래스 처럼 이름이 있고 반복해서 사용 가능
* 익명클래스 처럼 비정적 문맥에서 사용될 때만 바깥 인스턴스를 사용할 수 있음.
* 정적 멤버는 가지지 못함.
* 가독성을 위해 짧게