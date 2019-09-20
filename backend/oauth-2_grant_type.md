# OAuth2 Grant Type
OAuth2의 Grant type은 'access token을 받는 방법' 정도로 정리할 수 있다.\
Grant type 4가지에 대해 정리해 보았고, 가장 많이 사용한다고 하는 `Authorization Code Grant Type`에 대해선 번역을 하면서 조금 자세하게 알아보았다. 이 페이지의 내용은 거의 [https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749#section-2.1) 에서 가져왔다.\
이전 글에서 알아본 것 처럼 OAuth2의 Grant Type에는 네 가지가 있다.
* Authorization Code Grant Type : 권한 부여 코드 승인 타입
* Implicit Grant Type : 암시적 승인
* Resource Owner Password Credentials Grant Type : 리소스 소유자 암호 자격 증명 타입
* Client Credentials Grant Type : 클라이언트 자격 증명 타입
## Authorization Code Grant Type
Web이나 mobile apps에서 주로 사용하는 방식 이다.\
Access token과 Refresh token을 얻기 위한 방법. confidential clients에 최적화. 이는 redirection-based 흐름이므로 client는 resource owner의 user-agent(일반적으로 웹 브라우저) 와 상호 작용할 수 있어야 하며 authorization server 서버로부터 수신 요청을 수신할 수 있어야 한다.\
Authorization Server와 통신할 때, 아래와 같은 parameter가 사용된다.
### 파라미터
* response_type=code : 사용할 Grant Type 종류를 의미하며, `code`는 Authorization Code Grant Type을 의미한다.
* client_id : client를 식별할 수 있는 id. github(Authorization Server)에 등록된 leetcode의 id
* redirect_uri : 인증 과정이 완료된 후 접근할 client의 uri
* scope : One or more space-separated strings indicating which permissions the application is requesting. The specific OAuth API you’re using will define the scopes that it supports.
* state - The application generates a random string and includes it in the request. It should then check that the same value is returned after the user authorizes the app. This is used to prevent CSRF attacks.

### 흐름
Authorization Code Grant Type의 전체적 흐름은 아래와 같다.
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
하나 하나 떼어 보자...
#### A. 
```
            +----------+
            | Resource |
            |   Owner  |
            |          |
            +----------+



            +----------+          Client Identifier      +---------------+
            |         -+----(A)-- & Redirection URI ---->|               |
            |  User-   |                                 | Authorization |
            |  Agent   |                                 |     Server    |
            |          |                                 |               |
            |          |                                 |               |
            +-|--------+                                 +---------------+
              |    
             (A)   
              |    
              ^    
            +---------+
            |         |
            |  Client |
            |         |
            |         |
            +---------+
```
OAuth2 인증이 시작되는 단계로, Login Page에서 github 로그인을 선택한 단계에 해당한다. Client로 부터 Authorization Server로 접근할 수 있는 uri와 client_id, redirect_uri, response_type, scope, state를 같이 받아 redirect 시킨다.

#### B. 
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
            |          |                                 |               |
            +-|--------+                                 +---------------+
              |    
             (A)   
              |    
              ^    
            +---------+
            |         |
            |  Client |
            |         |
            |         |
            +---------+
```
A의 과정을 통해 User Agent에는 Authorization Server의 login page가 떠있고, Authorization Server에 등록된 Resource Owner의 id, password를 사용하여 로그인 한다.
#### C.
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
              |    |   
             (A)  (C)  
              |    |   
              ^    v   
            +---------+
            |         |
            |  Client |
            |         |
            |         |
            +---------+
```
인증이 완료되면 Authorization Server는 User Agent로 Authorization Code를 전송하고, User Agent는 Client로 Authorization Code를 보낸다.
#### D.
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
              |    |                                         ^      
             (A)  (C)                                        |      
              |    |                                         |      
              ^    v                                         |      
            +---------+                                      |      
            |         |>---(D)-- Authorization Code ---------'      
            |  Client |          & Redirection URI                  
            |         |
            |         |
            +---------+
```
Client는 Authorization Code를 이용하여 Authorization Server에 Access Tokeen을 요청한다. 이 과정에서 Authorization Server는 Client의 정보를 저장한다.
#### E. 
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
Authorization Server는 client를 인증학고, Auth Code를 인증한다. 지금 받은 uri와 C에서 받은 uri가 같은 지 확인하고, 같으면 Access Token과 Refresh Token(optional)을 내려준다.
## Implicit Grant Type
권한 부여 코드 승인 타입과 다르게 권한 코드 교환 단계 없이 엑세스 토큰을 즉시 반환받아 이를 인증에 이용하는 방식이다. 그리고 이 특정 Redirection URI를 운영한다고 알려진 공공 Client에 최적화 된다(optimized for public clients known to operate a particular redirection URI). 여기서 Client는, Javascript와 같은 scripting 언어를 사용하여 browser에서 구현된다. \
앞선 타입과 같이 redirection-based flow 이다.\
Unlike the authorization code grant type, in which the client makes separate requests for authorization and for an access token, the client receives the access token as the result of the authorization request.\
The implicit grant type does not include client authentication, and relies on the presence of the resource owner and the registration of the redirection URI.  Because the access token is encoded into the redirection URI, it may be exposed to the resource owner and other applications residing on the same device.
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
## Resource Owner Password Credentials Grant Type
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
## Client Credentials Grant Type
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
