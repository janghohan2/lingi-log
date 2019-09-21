# Spring Security - exceptions
## 역할
인증 과정 중 발생할 수 있는 Exception을 정의한다.
## exceptions 소스
1. ExpiredTokenException
```java
public class ExpiredTokenException extends AuthenticationException {
    private static final long serialVersionUID = 1L;

    public ExpiredTokenException(String message){
        super(message);
    }

    public ExpiredTokenException(String message, Throwable t) {
		super(message, t);
	}
}
```
1. InvalidTokenException
```java
public class InvalidTokenException extends AuthenticationException {
    private static final long serialVersionUID = 1L;

    public InvalidTokenException(String message){
        super(message);
    }

    public InvalidTokenException(String message, Throwable t) {
		super(message, t);
	}
}
```
## 설명
