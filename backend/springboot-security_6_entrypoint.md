# Spring Security - entry point
## 역할
인증 과정 중 예외가 발생하면 EntryPoint에서 error code를 세팅해 준다.
## entry point 소스
```java
@Component
public class RESTAuthenticationEntryPoint implements AuthenticationEntryPoint {
  
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
      throws IOException, ServletException {
        authException.printStackTrace();
        if(authException instanceof BadCredentialsException){
          // 입력 정보 안맞음
          response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }else{
          // 권한 없이 요청
          response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        }
  }
}
```
## 설명
1. commence
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    public|void|HttpServletRequest<br>HttpServletResponse|IOException<br>ServletException
    * 역할
        * 인증 과정 중 예외가 발생하면 호출됨.
        * 예외 종류에 따라 response에 http status code를 세팅해줄 수 있음.