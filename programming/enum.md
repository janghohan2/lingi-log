# Enum에 관하여
Enum... 이란 것을 알고 있긴 했지만 잘 사용하진 않았는데 최근 회사에서 domain 설계를 할 때 enum을 사용할 일이 생겨 공부한 내용을 정리한다.

## 상수를 표현할 때 사용한 방법
지금 까지는 상수를 표현할 때

```java
private static final int MY_INT_CONSTANTS = 1;
private static final String MY_STRING_CONSTANTS = "my string constants";
```

이렇게 `private static final ~` 을 사용하고 필드 이름을 대문자, 언더바를 써서 정의를 했었다. Enum 이란 것을 알고 있긴 했지만 잘 사용하진 않았었고, 회사 코드도 모두 이런 식으로 구현되어있어서 생각 없이 이렇게 사용하고 있었다. 이 방식은 각각 **Int enum** 패턴, **String enum** 패턴으로 불리는데 Effective Java에 따르면 이런 패턴은 아주 안좋은 패턴 이라고 한다.

다행히 Java 1.5 부터 이런 패턴의 문제점믈 해소할 수 있는 대안이 도입되었는데, 이것이 바로 **enum** 이다.

Enum의 특징을 간단하게 살펴보면

## Enum의 특징
* 열거 상수 별 하나의 객체를 public static finall 필드 형태로 제공
* 컴파일 시점 형 안정성을 제공한다.
* 이름과 상수가 분리된다.
* 임의 메서드나 필드를 추가할 수 있다.
* 인터페이스를 이용해 확장이 가능하다.

이중 이번에 네 번째, 다섯 번째 특징에 대해 중점적으로 알아보았다.

## 특징 - 임의 메서드나 필드를 추가할 수 있다.
아래 예시는 `HttpStatus` 이다. 무심코 지나쳤지만 알고보니 enum으로 구현 되어 있었고, 아주 적절한 예시 라고 생각하여 가져왔다. 소스를 보면 아래와 같은데
```java
package org.springframework.http;

import org.springframework.lang.Nullable;

public enum HttpStatus {
    
    // 2xx Success

	/**
	 * {@code 200 OK}.
	 * @see <a href="https://tools.ietf.org/html/rfc7231#section-6.3.1">HTTP/1.1: Semantics and Content, section 6.3.1</a>
	 */
	OK(200, "OK"),
	
    ...;

	private final int value;
	private final String reasonPhrase;

	HttpStatus(int value, String reasonPhrase) {
		this.value = value;
		this.reasonPhrase = reasonPhrase;
	}


	/**
	 * Return the integer value of this status code.
	 */
	public int value() {
		return this.value;
	}

	/**
	 * Return the reason phrase of this status code.
	 */
	public String getReasonPhrase() {
		return this.reasonPhrase;
	}

    ...

}
```

여기서 보면
```java
private final int value;
private final String reasonPhrase;
```

필요한 데이터를 `private final` 로 선언해놓고
```java
HttpStatus(int value, String reasonPhrase) {
    this.value = value;
    this.reasonPhrase = reasonPhrase;
}
```
생성자에서 파라미터로 넘겨준다. 이렇게 넘겨준 필드는 

```java
/**
 * Return the integer value of this status code.
 */
public int value() {
    return this.value;
}

/**
 * Return the reason phrase of this status code.
 */
public String getReasonPhrase() {
    return this.reasonPhrase;
}

/////////////////////////////////////////////
///                 사용                    //
/////////////////////////////////////////////
HttpStatus.OK.value();
HttpStatus.OK.getReasonPhrase();

```
이런 식으로 public method를 선언하여 외부에서 접근할 수 있다.

## 특징 - 인터페이스를 이용해 확장이 가능하다.
Effective Java에 따르면 인터페이스를 확장하여 enum을 만드는 것이 경우에 따라 효과적으로 쓰일 수 있긴 하지만 대부분의 경우 그리 좋은 생각은 아니라고 한다.

하지만 이번에 개발할 때 여러 조건을 따져 보니 결국 interface를 확장 하여 enum을 구현하는 것이 좋겠다는 판단을 하였다. 고려했던 조건은 아래와 같다.
* 여러 Item에 관한 세부 항목을 Item별로 구분하여 정의해야 한다. 
* 모든 Item의 세부 항목을 Item종류에 상관없이 파라미터를 넘길 수 있어야 한다.

고민 끝에 아래와 같이 개발하였다.(그대로 올릴 수 없어서 코드를 변경했다.)
```java
public enum FirstItemDetail implements ItemTypeDetail {
    DETAIL_0("0"),
    DETAIL_2("2");

    private final String value;
    private static final Map<String, FirstItemDetail> map = new HashMap<>();
    static{
        for(FirstItemDetail firstitemDetail : FirstItemDetail.values()){
            map.put(firstitemDetail.value, firstitemDetail);
        }
    }

    ItemTypeDetail(String value) {
        this.value = value;
    }

    @Override
    public String value() {
        return value;
    }

    public static ItemTypeDetail getDetail(String value) {
        return map.get(value);
    }
}
```

이렇게 ItemTypeDetail의 하위타입으로 여러 Item에 관한 detail 이 정의된 enum을 구현할 수 있었고, ItemTypeDetail이 쓰이는 곳에 이렇게 구현한 enum을 넘길 수 있게 되었다. 

## 결론
가끔 프로그래밍 언어도 '언어' 이고, 개발을 하는 것이 '글을 쓰는 행위'와 비슷하다고 생각한 적이 있다. 그런 관점에서 봤을 때  enum은 글의 의도를 명확하게 드러낼 수 있는 좋은 표현 방법이라는 생각이 든다. 지금까지 enum을 사용하지 않은 것이 부끄럽게 생각이 들기도 하지만 한편으론 한단계 레벨업 한것 같은 기분이 들었다. 숙련도(?)에 따라 다양하게 사용할 수 있을 것같다.