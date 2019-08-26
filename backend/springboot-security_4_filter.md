# Spring security 사용 예시 - filter
## 역할
spring security로 보호되는 uri(내 소스의 경우 /api/**)로 접근하는 request에 대해 
* authenticationManager를 통해 jwt token을 검증한다.
## filter 소스 예시
```java
public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final String HEADER_SECURITY_TOKEN = "Authorization"; 

    public JwtAuthenticationFilter(RequestMatcher matcher, AuthenticationSuccessHandler authenticationSuccessHandler, AuthenticationFailureHandler authenticationFailureHandler) {
        super(matcher);
        super.setAuthenticationSuccessHandler(authenticationSuccessHandler);
        super.setAuthenticationFailureHandler(authenticationFailureHandler);
    }
 
    @Override 
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        JwtAuthenticationToken jwtAuthenticationToken = null;
        
        JwtToken jwtToken = new JwtToken(request.getHeader(HEADER_SECURITY_TOKEN));
        jwtAuthenticationToken = new JwtAuthenticationToken(jwtToken, null);
        response.setHeader("Access-Control-Expose-Headers", "*");
        response.setHeader("Authorization", jwtToken.toString());
        return getAuthenticationManager().authenticate(jwtAuthenticationToken);
    }
 
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        super.doFilter(req, res, chain);
    }

}
```
## 설명
1. JwtAuthenticationFilter
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    public|-|RequestMatcher<br>AuthenticationSuccessHandler<br>AuthenticationFailureHandler|-
    * 역할  
        * 생성자
        * RequestMatcher : filter를 적용시킬 url정보
        * AuthenticationSuccessHandler : 인증 성공 후 후속 작업
        * AuthenticationFailureHandler : 인증 실패 후 성공 작업

1. attemptAuthentication
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    public|Authentication|HttpServletRequest<br>HttpServletResponse|AuthenticationException<br>IOException<br>ServletException
    * 역할  
        * Request와 Response를 받고, Request애서 token을 가져와 token이 유효한지 검사한다.