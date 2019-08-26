# Spring Security 사용예시 - provider
## 역할
Authentication에 대한 인증 작업을 한다.
## provider 소스
```java

@Component
@SuppressWarnings("unchecked")
public class JwtAuthenticationProvider implements AuthenticationProvider {
    // private JwtTokenUtil jwtTokenUtil;
    @Autowired private JwtTokenUtil jwtTokenUtil;
    @Autowired private AuthorityRepository authorityRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // jwtTokenUtil = new JwtTokenUtil();
        JwtToken jwtToken = (JwtToken) authentication.getPrincipal();
        Claims claims = null;
        try{
            claims = jwtTokenUtil.parseToken(jwtToken);
            jwtToken.setUsername((String)claims.get("username"));
            jwtToken.setPassword((String)claims.get("password"));
        }catch(ExpiredJwtException e){
            throw new ExpiredTokenException(e.getMessage());
        }catch(Exception e){
            throw new InvalidTokenException(e.getMessage());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        //exp date check
        return authentication;
    }


    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(JwtAuthenticationToken.class);
    }
}
```
## 설명
1. authenticate
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    public|Authentication|Authentication|AuthenticationException
    * 역할
        * jwt token이 유효한지 검사한다.
        * SecurityContextHolder에 parameter로 받은 authentication을 등록한다.
1. supports
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    public|boolean|Class<?>|-
    * 역할
        * 현재 Provider를 인증에 사용할 지 여부를 결정한다.
        * 예를 들어 나의 코드는 인자로 받은 authentication의 클래스가  JwtAuthenticationToken.class와 같은 경우에만 authenticate를 진행한다.
