# oauth 알아보기
## Grant Type
In OAuth 2.0, the term "grant type" refers to the way an application gets an access token\

* Authorization Code Grant Type : 권한 부여 코드 승인 타입
* Implicit Grant Type : 암시적 승인
* Resource Owner Password Credentials Grant Type : 리소스 소유자 암호 자격 증명 타입
* Client Credentials Grant Type : 클라이언트 자격 증명 타입

## 예시
1. leetcode 로그인
https://github.com/login?client_id=6efe458dfe2230acceea&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D6efe458dfe2230acceea%26redirect_uri%3Dhttps%253A%252F%252Fleetcode.com%252Faccounts%252Fgithub%252Flogin%252Fcallback%252F%26response_type%3Dcode%26scope%3Duser%253Aemail%26state%3DIvVzFA47jVoz

### Authorization Code Grant Type
가장 많이 사용되는 타입. Server side application에 최적화 되어있고, 
![Authrization Code](/auth_code_flow.png)
#### flow
The Authorization Code grant type is used by web and mobile apps. It differs from most of the other grant types by first requiring the app launch a browser to begin the flow. At a high level, the flow has the following steps:
* The application opens a browser to send the user to the OAuth server
* The user sees the authorization prompt and approves the app’s request
* The user is redirected back to the application with an authorization code in the query string
* The application exchanges the authorization code for an access token

클라이언트가 다른 사용자 대신 특정 리소스에 접근을 요청할 때 사용됩니다. 리스소 접근을 위한 사용자 명과 비밀번호, 권한 서버에 요청해서 받은 권한 코드를 함께 활용하여 리소스에 대한 엑세스 토큰을 받는 방식입니다.
The Authorization Code Grant Type is probably the most common of the OAuth 2.0 grant types that you’ll encounter. It is used by both web apps and native apps to get an access token after a user authorizes an app.

### Implicit Grant Type
권한 부여 코드 승인 타입과 다르게 권한 코드 교환 단계 없이 엑세스 토큰을 즉시 반환받아 이를 인증에 이용하는 방식입니다.
![Implicit](/implicit_flow.png)
### Resource Owner Password Credentials Grant Type(내가 구현한 방식)
클라이언트가 암호를 사용하여 엑세스 토큰에 대한 사용자의 자격 증명을 교환하는 때입니다.
With the resource owner password credentials grant type, the user provides their service credentials (username and password) directly to the application, which uses the credentials to obtain an access token from the service. This grant type should only be enabled on the authorization server if other flows are not viable. Also, it should only be used if the application is trusted by the user (e.g. it is owned by the service, or the user’s desktop OS).

Password Credentials Flow

* After the user gives their credentials to the application, the application will then request an access token from the authorization server. The POST request might look something like this:

https://oauth.example.com/token?grant_type=password&username=USERNAME&password=PASSWORD&client_id=CLIENT_ID
If the user credentials check out, the authorization server returns an access token to the application. Now the application is authorized!

**Note**: DigitalOcean does not currently support the password credentials grant type, so the link points to an imaginary authorization server at “oauth.example.com”.
### Client Credentials Grant Type
클라이언트가 컨텍스트 외부에서 액세스 토큰을 얻어 특정 리소스에 접근을 요청할 때 사용하는 방식입니다.
The client credentials grant type provides an application a way to access its own service account. Examples of when this might be useful include if an application wants to update its registered description or redirect URI, or access other data stored in its service account via the API.

Client Credentials Flow
The application requests an access token by sending its credentials, its client ID and client secret, to the authorization server. An example POST request might look like the following:

https://oauth.example.com/token?grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
If the application credentials check out, the authorization server returns an access token to the application. Now the application is authorized to use its own account!

Note: DigitalOcean does not currently support the client credentials grant type, so the link points to an imaginary authorization server at “oauth.example.com”.

---
// https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type#get-the-users-permission
// https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2