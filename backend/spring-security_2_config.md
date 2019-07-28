# 사용 예시
## 1. Config 파일.
```java
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    ...

    /**
     * filter builder
     * 
     * @param pathsToSkip
     * @param pattern
     * @return
     * @throws Exception
     */
    protected JwtAuthenticationFilter buildJwtAuthenticationFilter(List<String> pathsToSkip, String pattern) throws Exception {
        RequestMatcherImpl requestMatcherImpl = new RequestMatcherImpl(pathsToSkip, pattern);
        JwtAuthenticationFilter filter
            = new JwtAuthenticationFilter(requestMatcherImpl, tokenSimpleUrlAuthenticationSuccessHandler, jwtAuthenticationFailureHandler);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {    
        
        List<String> permitAllEndpointList = new ArrayList<>();
        permitAllEndpointList.add(AUTHENTICATION_SIGN_IN_URL);
        permitAllEndpointList.add(AUTHENTICATION_SIGN_OUT_URL);
        permitAllEndpointList.add("/");

        httpSecurity
            .csrf().disable()
            // front - back 분리를 위해 cors 설정
            .cors()
                .configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and()
            // rest api 구현을 위한 session 설정
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            // 접근 경로 설정
            .authorizeRequests()
                .antMatchers(AUTHENTICATION_SIGN_IN_URL, AUTHENTICATION_SIGN_OUT_URL).permitAll()
                .antMatchers(API_ROOT_URL).authenticated()
                .anyRequest().permitAll()
                .and()
            // 권한이 있는 지 체크 해 주는 필터
            .addFilterBefore(buildJwtAuthenticationFilter(permitAllEndpointList, API_ROOT_URL)
                , UsernamePasswordAuthenticationFilter.class)
            // entry point 설정
            .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        // 로그인 인증을 위한 등록
        auth.userDetailsService(authService).passwordEncoder(authService.passwordEncoder());
        // rest api 접근을 위한 등록
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
         return super.authenticationManagerBean();
    }
}
```
### 메서드 설명
1. buildJwtAuthenticationFilter
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    protected|JwtAuthenticationFilter|`List<String>` pathsToSkip, `String` pattern|Exception

    * 역할 : jwt 인증 필터 생성하여 반환

2. configure
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    protected|void|`HttpSecurity` httpSecurity|Exception

    * 특징 : Override 메서드.
    * 역할
        * spring security 사용을 위한 설정을 할 수 있다.
        * front - back 분리를 위해 cors 설정
        * rest api 구현을 위한 session 설정
        * 접근 경로 설정
        * 권한이 있는 지 체크 해 주는 필터
        * entry point 설정

3. configure
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    protected|void|`AuthenticationManagerBuilder` auth|Exception

    * 역할
        * 로그인 인증을 위한 service 등록
        * rest api 접근을 위한 provider 등록


4. authenticationManagerBean
    접근자|리턴 타입|파라미터|exception
    -|-|-|-
    public|AuthenticationManager|-|Exception

    * 특징
        * Bean으로 등록
        * Override 메소드