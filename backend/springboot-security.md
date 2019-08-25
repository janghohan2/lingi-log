# Spring Security

* 로그인?
    * 보통 
        * 한 번 로그인 하면 그 후에는 SessionId로 식별
        * SecurityContextPersistenceFilter가 요청 사이에서 SecurityContext를 HttpSession Attribute 형태로 저장.
        * 요청이 오면 SecurityContextHolder에 가져오고, 요청이 완료되면 SecurityConteext에서 삭제
    * Rest
        * Http Session을 사용하지 않고, 모든 요청에서 다시 인증.

* Security
    * 기본적으로 세션을 사용하고 있지만, Securituy Context 객체를 통해 간접적으로 인증 정보를 전달.
    * 세션을 사용하지 않는 이유?
        * HttpSession... Servlet에 의존적임.
        * AOP, 인터셉터 등 공통 프레임워크 만들 때 유용.
        * Http 세션 말고도 외부로 인증 정보를 전달하는 것도 가능하다.]

* AuthenticationProvider 인터페이스.
    * 화면에서 가져온 로그인 정보와 db에서 가져온 사용자의 정보를 비교해 주는 인터페이스
    * 커스텀 인증을 구현하는 클래스.
    * authenticate 메서드 오버라이드
        ```java
        public Authentication authenticate(Authentication authentication) throws AuthenticationException{
            ...
            // AuthenticationManager, AuthenticationProvider 에서 사용되어야 함.
            return UsernamePasswordAuthentication(username, password, user.getAuthorities());
        }
        ```

* Security 사용을 위한 java  config 설정

* UserNameAuthenticationToken
    * Authentication 의 sub class
    * Principal : user id, credential : password
    * 생성자 두개
        * (principal, credential) : 인증 전 객체
        * (principal, credential, authorities) : 인증 후 객체
* Authentication 인터페이스
    * 현재 접근 주체의 정보
    * 현재 인증 주체의 정보
* SecurityContextHolder
* Authenticate
* AuthenticationManager와 AuthenticationProvider
    같은 역할
    * AuthenticationManager
        * `Authentication authenticate(Authentication authentication) throws Exception`
    * AuthenticationProvider
        * `Authentication authenticate(Authentication authentication) throws Exception`
        * `Bool support(class<?> authentication)`
            * 이 클래스가 Authentication object를 지원(?) gksms wl duqnfmf true/false로 return 해줌.