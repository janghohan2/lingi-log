# OAuth2 알아보기
## OAuth2를 구성하는 네 가지 Roles
OAuth2를 구성하는 Role을 살펴보면 `Resource Owner`, `Resource Server`, `Client Application`, `Authorization Server`가 있다. 이해하기 조금 힘들었는데, leetcode에서 github을 사용해 로그인 하는 경우를 예로 들어 보면
* Resource Owner : '나'. 나는 github 회원이고, github을 통해 login하여 leetcode를 이용하려 한다.
* Resource Server : 내 깃헙 정보를 가지고 있는 서버. (leet code를 이용할 땐 이 resource server와는 별다른 통신을 하지 않는 것 같다. leet code에서 github데이터에 접근 할 필요는 없지 않을까...)
* Client Application : 여기선 github login을 제공하는 leetcode를 client라고 볼 수 있다.
* Authorization Server : github에서 인증 처리를 해주는 서버.

정리해보자면,\
`Authorization Server`, `Resource Server` = `github`\
`Client` = `leetcode`\
`Resource Owner` = `나` \
라고 정리할 수 있을 것 같다.
## Grant Type
`Grant`란 `Client Application`이 `Resource Owner`의 보호 된 리소스에 액세스하기 위한 `access token`을 얻기 위한 `credential` 이다. 네 가지가 있다.
* Authorization Code Grant Type : 권한 부여 코드 승인 타입
* Implicit Grant Type : 암시적 승인
* Resource Owner Password Credentials Grant Type : 리소스 소유자 암호 자격 증명 타입
* Client Credentials Grant Type : 클라이언트 자격 증명 타입
## Access Token과 Refresh Token
Access Token과 Refresh Token에대한 설명은 [http://blog.weirdx.io/post/39955](http://blog.weirdx.io/post/39955)여기에 설명이 잘 되어 있다.(아래 내용)
### Access Token
요청 절차를 정상적으로 종료한 클라이언트에게 발급됩니다. 이 토큰은 보호된 자원에 접근할 때 권한 확인용으로 사용됩니다. 문자열 형태이며 클라이언트에 발급된 권한을 대표하게 됩니다. 계정 아이디와 비밀번호 등 계정 인증에 필요한 형태들을 이 토큰 하나로 표현함으로써, 리소스 서버는 여러 가지 인증 방식에 각각 대응 하지 않아도 권한을 확인 할 수 있게 됩니다.
### Refresh Token
한번 발급받은 access token은 사용할 수 있는 시간이 제한되어 있습니다. 사용하고 있던access token이 유효기간 종료 등으로 만료되면, 새로운 액세스 토큰을 얻어야 하는데 그때 이 refresh token 이 활용됩니다. 권한 서버가 access token을 발급해주는 시점에 refresh token도 함께 발급하여 클라이언트에게 알려주기 때문에, 전용 발급 절차 없이 refresh token을 미리 가지고 있을 수 있습니다. 토큰의 형태는 access token과 동일하게 문자열 형태입니다. 단 권한 서버에서만 활용되며 리소스 서버에는 전송되지 않습니다.

---
https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type#get-the-users-permission\
https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2\
http://blog.weirdx.io/post/39955