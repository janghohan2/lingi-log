# 타입 안전 이종 컨테이너를 고려하라
> 컬렉션 API로 대표되는 일반적인 제네릭 형태에서는 한 컨테이너가 다룰 수 있는 타입 매개변수의 수가 고정되어 있다. 하지만 컨테이너 자체가 아닌 키를 타입 매개변수로 바꾸면 이런 제약이 없는 `타입 안전 이종 컨테이너`를 만들 수 있다. `타입 안전 이종 컨테이너`는 `Class`를 키로 쓰며, 이런 식으로 쓰이는 `Class` 객체를 타입 토큰이라 한다. 또한, 이런 식으로 쓰이는 `Class` 객체를 타입 토큰이라 한다. 또한, 직접 구현한 키 타입도 쓸 수 있다. 예컨데 데이터베이스의 행(컨테이너)을 표현한 `DatabaseRow` 타입에는 제네릭 타입인 `Column<T>`를 키로 쓸 수 있다.

예를 들어 보자. `Set<E>`, `Map<K, V>`같은 컬렉션은 한 컨테이너가 다룰 수 있는 타입 매개변수가 고정되어 있다. 일반적으로는 문제될 것이 없지만 더 유연한 수단이 필요할 때가 종종 있다.

데이터베이스의 행(row)은 임의 개수의 열(column)을 가질 수 있는데, 이때 `타입 안전 이종 컨테이너` 패턴을 이용하면 된다.

## 타입 안전 이종 컨테이너
**타입 안전 이종 컨테이너**란 컨테이너 대신 키를 매개변수화 한 뒤, 컨테이너에 값을 넣거나 뺄 때 매개변수화한 키를 함께 제공하는 방식이다.  제네릭 타입 시스템이 값의 타입이 키와 같음을 보장해 준다.

### 예를 들어 Favorites
`Favorites` 클래스는 타입별로 즐겨 찾는 인스턴스를 저장하고 검색할 수 있는 클래스 이다. 

```java
public class Favorites {
    // 비한정적 와일드카드 타입이라 맵 안에 아무것도 넣을 수 없다고 생각할 수 있지만
    // 와일드카드가 중첩된 형태로, 아무거나 넣을 수 있다. 
    private Map<Class<?>, Object> favorites = new HashMap<>();

    public <T> void putFavorite(Class<T> type, T instance){
        favorites.put(Objects.requireNonNull(type), instance);
    }
    public <T> T getFavorite(Class<T> type) {
        return type.cast(favorites.get(type));
    }
}

public class MyClass {
    public static void main(String[] args) {
        Favorites f = new Favorites();

        f.putFavorite(String.class, "Java");
        f.putFavorite(Integer.class, 0xcafebabe);

        String favoriteString = f.getFavorie(String.class);
        Integer favoriteInteger = f.getFavorie(Integer.class);
    }

}
```
`Favorites`가 사용하는 타입 토큰은 비한정적이다. 즉, `getFavorite`과 `putFavorite`은 어떤 Class 객체든 받아들인다. 여기서 한정적 타입토큰을 사용하면 메소드가 허용하는 타입을 제한할 수 있다.

### 한정적 타입토큰 활용
```java
static Annotation getAnnotation(AnnotatedElement element, String AnnotationTypeName) {
    Class<?> annotationType = null;

    try {
        annotationType = null;
        try{
            annotationType = Class.forName(annotationTypeName);
        } catch (Exception ex) {
            throw new IllegalArgumentException(ex);
        }

        return element.getAnnotation(
            annotationType.asSubClass(Annotation.class));
        )
    }
}
```
이 인스턴스는 String을 요청했는데 Integer를 반환할 일이 절대 없기 때문에 타입 안전하다.