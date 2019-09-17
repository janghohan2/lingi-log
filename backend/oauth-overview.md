# oauth 알아보기
## OAuth를 구성하는 네 가지 Roles
* Resource Owner : 일반 사용자
* Resource Server : 권한 검증을 한 후 적절한 결과 응답. REST API
* Client Application : `Resource Owner`의 `Protected Resource`에 접근 요청을 하는 Application. Web이나 App인데 Web의 경우 브라우저에서 돌아가는 Front단으로 이해했다.
* Authorization Server : client가 성공적으로 access token을 발급 받은 후 resource를 인증하고 권한을 부여함.
## Grant Type
In OAuth 2.0, the term "grant type" refers to the way an application gets an access token\
`Grant`란 `Client Application`이 `Resource Owner`의 보호 된 리소스에 액세스하기 위한 `access token`을 얻기 위한 `credential` 이다.
* Authorization Code Grant Type : 권한 부여 코드 승인 타입
* Implicit Grant Type : 암시적 승인
* Resource Owner Password Credentials Grant Type : 리소스 소유자 암호 자격 증명 타입
* Client Credentials Grant Type : 클라이언트 자격 증명 타입
### Authorization Code Grant Type
Web이나 mobile apps에서 주로 사용하는 방식 이다.(Leet code에서 Github 로그인을 할 때 이 방식을 사용함.) \
Access token과 Refresh token을 얻기 위한 방법. confidential clients에 최적화. 이는 redirection-based 흐름이므로 client는 resource owner의 user-agent(일반적으로 웹 브라우저) 와 상호 작용할 수 있어야 하며 authorization server 서버로부터 수신 요청을 수신할 수 있어야 한다.

![Authrization Code](/auth_code_flow.png)
```
            +----------+
            | Resource |
            |   Owner  |
            |          |
            +----------+
                 ^
                 |
                (B)
            +----|-----+          Client Identifier      +---------------+
            |         -+----(A)-- & Redirection URI ---->|               |
            |  User-   |                                 | Authorization |
            |  Agent  -+----(B)-- User authenticates --->|     Server    |
            |          |                                 |               |
            |         -+----(C)-- Authorization Code ---<|               |
            +-|----|---+                                 +---------------+
              |    |                                         ^      v
             (A)  (C)                                        |      |
              |    |                                         |      |
              ^    v                                         |      |
            +---------+                                      |      |
            |         |>---(D)-- Authorization Code ---------'      |
            |  Client |          & Redirection URI                  |
            |         |                                             |
            |         |<---(E)----- Access Token -------------------'
            +---------+       (w/ Optional Refresh Token)
```
1. The client initiates the flow by directing the resource owner's user-agent to the authorization endpoint.  The client includes its client identifier, requested scope, local state, and a redirection URI to which the authorization server will send the user-agent back once access is granted (or denied).
2.  The authorization server authenticates the resource owner (via the user-agent) and establishes whether the resource owner grants or denies the client's access request.
3.  Assuming the resource owner grants access, the authorization server redirects the user-agent back to the client using the redirection URI provided earlier (in the request or during client registration).  The redirection URI includes an authorization code and any local state provided by the client earlier.
4.  The client requests an access token from the authorization server's token endpoint by including the authorization code received in the previous step.  When making the request, the client authenticates with the authorization server.  The client includes the redirection URI used to obtain the authorization code for verification.
5.  The authorization server authenticates the client, validates the authorization code, and ensures that the redirection URI received matches the URI used to redirect the client in step (C).  If valid, the authorization server responds back with an access token and, optionally, a refresh token.

#### flow
The Authorization Code grant type is used by web and mobile apps. It differs from most of the other grant types by first requiring the app launch a browser to begin the flow. At a high level, the flow has the following steps:
* The application opens a browser to send the user to the OAuth server
* The user sees the authorization prompt and approves the app’s request
* The user is redirected back to the application with an authorization code in the query string
* The application exchanges the authorization code for an access token

클라이언트가 다른 사용자 대신 특정 리소스에 접근을 요청할 때 사용됩니다. 리스소 접근을 위한 사용자 명과 비밀번호, 권한 서버에 요청해서 받은 권한 코드를 함께 활용하여 리소스에 대한 엑세스 토큰을 받는 방식입니다.
The Authorization Code Grant Type is probably the most common of the OAuth 2.0 grant types that you’ll encounter. It is used by both web apps and native apps to get an access token after a user authorizes an app.

### Implicit Grant Type
권한 부여 코드 승인 타입과 다르게 권한 코드 교환 단계 없이 엑세스 토큰을 즉시 반환받아 이를 인증에 이용하는 방식이다. 그리고 이 특정 Redirection URI를 운영한다고 알려진 공공 Client에 최적화 된다(optimized for public clients known to operate a particular redirection URI). 여기서 Client는, Javascript와 같은 scripting 언어를 사용하여 browser에서 구현된다. \
앞선 타입과 같이 redirection-based flow 이다.\
Unlike the authorization code grant type, in which the client makes separate requests for authorization and for an access token, the client receives the access token as the result of the authorization request.\
The implicit grant type does not include client authentication, and relies on the presence of the resource owner and the registration of the redirection URI.  Because the access token is encoded into the redirection URI, it may be exposed to the resource owner and other applications residing on the same device.
![Implicit](/implicit_flow.png)
```
            +----------+
            | Resource |
            |  Owner   |
            |          |
            +----------+
                 ^
                 |
                (B)
            +----|-----+          Client Identifier     +---------------+
            |         -+----(A)-- & Redirection URI --->|               |
            |  User-   |                                | Authorization |
            |  Agent  -|----(B)-- User authenticates -->|     Server    |
            |          |                                |               |
            |          |<---(C)--- Redirection URI ----<|               |
            |          |          with Access Token     +---------------+
            |          |            in Fragment
            |          |                                +---------------+
            |          |----(D)--- Redirection URI ---->|   Web-Hosted  |
            |          |          without Fragment      |     Client    |
            |          |                                |    Resource   |
            |     (F)  |<---(E)------- Script ---------<|               |
            |          |                                +---------------+
            +-|--------+
              |    |
             (A)  (G) Access Token
              |    |
              ^    v
            +---------+
            |         |
            |  Client |
            |         |
            +---------+
```
1. The client initiates the flow by directing the resource owner's user-agent to the authorization endpoint.  The client includes its client identifier, requested scope, local state, and a redirection URI to which the authorization server will send the user-agent back once access is granted (or denied).
2. The authorization server authenticates the resource owner (via the user-agent) and establishes whether the resource owner grants or denies the client's access request.
3. Assuming the resource owner grants access, the authorization server redirects the user-agent back to the client using the redirection URI provided earlier.  The redirection URI includes the access token in the URI fragment.
4. The user-agent follows the redirection instructions by making a request to the web-hosted client resource (which does not include the fragment per [RFC2616]).  The user-agent retains the fragment information locally.
5. The web-hosted client resource returns a web page (typically an HTML document with an embedded script) capable of accessing the full redirection URI including the fragment retained by the user-agent, and extracting the access token (and other parameters) contained in the fragment.
6. The user-agent executes the script provided by the web-hosted client resource locally, which extracts the access token.
7. The user-agent passes the access token to the client.
### Resource Owner Password Credentials Grant Type(내가 구현한 방식)
클라이언트가 암호를 사용하여 엑세스 토큰에 대한 사용자의 자격 증명을 교환하는 때입니다.
With the resource owner password credentials grant type, the user provides their service credentials (username and password) directly to the application, which uses the credentials to obtain an access token from the service. This grant type should only be enabled on the authorization server if other flows are not viable. Also, it should only be used if the application is trusted by the user (e.g. it is owned by the service, or the user’s desktop OS).
```
            +----------+
            | Resource |
            |  Owner   |
            |          |
            +----------+
                v
                |    Resource Owner
               (A) Password Credentials
                |
                v
            +---------+                                  +---------------+
            |         |>--(B)---- Resource Owner ------->|               |
            |         |         Password Credentials     | Authorization |
            | Client  |                                  |     Server    |
            |         |<--(C)---- Access Token ---------<|               |
            |         |    (w/ Optional Refresh Token)   |               |
            +---------+                                  +---------------+
```

Password Credentials Flow

* After the user gives their credentials to the application, the application will then request an access token from the authorization server. The POST request might look something like this:

https://oauth.example.com/token?grant_type=password&username=USERNAME&password=PASSWORD&client_id=CLIENT_ID
If the user credentials check out, the authorization server returns an access token to the application. Now the application is authorized!

**Note**: DigitalOcean does not currently support the password credentials grant type, so the link points to an imaginary authorization server at “oauth.example.com”.
### Client Credentials Grant Type
클라이언트가 컨텍스트 외부에서 액세스 토큰을 얻어 특정 리소스에 접근을 요청할 때 사용하는 방식입니다.
The client credentials grant type provides an application a way to access its own service account. Examples of when this might be useful include if an application wants to update its registered description or redirect URI, or access other data stored in its service account via the API.
```
            +---------+                                  +---------------+
            |         |                                  |               |
            |         |>--(A)- Client Authentication --->| Authorization |
            | Client  |                                  |     Server    |
            |         |<--(B)---- Access Token ---------<|               |
            |         |                                  |               |
            +---------+                                  +---------------+
```

Client Credentials Flow
The application requests an access token by sending its credentials, its client ID and client secret, to the authorization server. An example POST request might look like the following:

https://oauth.example.com/token?grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
If the application credentials check out, the authorization server returns an access token to the application. Now the application is authorized to use its own account!

Note: DigitalOcean does not currently support the client credentials grant type, so the link points to an imaginary authorization server at “oauth.example.com”.

## Access Token과 Refresh Token
### Access Token
요청 절차를 정상적으로 종료한 클라이언트에게 발급됩니다. 이 토큰은 보호된 자원에 접근할 때 권한 확인용으로 사용됩니다. 문자열 형태이며 클라이언트에 발급된 권한을 대표하게 됩니다. 계정 아이디와 비밀번호 등 계정 인증에 필요한 형태들을 이 토큰 하나로 표현함으로써, 리소스 서버는 여러 가지 인증 방식에 각각 대응 하지 않아도 권한을 확인 할 수 있게 됩니다.
### Refresh Token
한번 발급받은 access token은 사용할 수 있는 시간이 제한되어 있습니다. 사용하고 있던access token이 유효기간 종료 등으로 만료되면, 새로운 액세스 토큰을 얻어야 하는데 그때 이 refresh token 이 활용됩니다. 권한 서버가 access token을 발급해주는 시점에 refresh token도 함께 발급하여 클라이언트에게 알려주기 때문에, 전용 발급 절차 없이 refresh token을 미리 가지고 있을 수 있습니다. 토큰의 형태는 access token과 동일하게 문자열 형태입니다. 단 권한 서버에서만 활용되며 리소스 서버에는 전송되지 않습니다.

---
https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type#get-the-users-permission\
https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2\
http://blog.weirdx.io/post/39955
## 예시
1. leetcode 로그인
https://github.com/login?client_id=6efe458dfe2230acceea&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D6efe458dfe2230acceea%26redirect_uri%3Dhttps%253A%252F%252Fleetcode.com%252Faccounts%252Fgithub%252Flogin%252Fcallback%252F%26response_type%3Dcode%26scope%3Duser%253Aemail%26state%3DIvVzFA47jVoz