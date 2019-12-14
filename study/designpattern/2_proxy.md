# Proxy Pattern
Proxy패턴은 Structural Design Pattern(클래스나 객체를 조합해 더 큰 구조를 만드는 패턴)으로, 원본 객체에 대한 요청 앞, 뒤로 무언가를 수행할 수 있도록 해 준다. 출처는 [이곳](https://refactoring.guru/design-patterns/proxy) 이다.
## 필요성에 대해.
왜 객체에 대한 접근을 제어해야 할까? 예를 들어 보자.\
많은 양의 시스템 리소스를 잡아먹는 방대한 양의 Object가 있다고 해 보자. 이 객체에 접근하는 Client들은 이 객체를 항상 필요로 하는 것이 아니라 가끔씩 필요로 한다.\
그래서 Client들은 Lazy Initialization(필요할 때 생성) Code를 실행해야 하는데, 이때 상당히 많은 코드의 중복이 발생할 수 있다.\
이상적으로는 Object 클래스에 이 로직을 집어넣는다면 좋겠지만, 현실은 불가능할 때가 많다. 예를들어 closed 3rd-party 라이브러리의 클래스를 사용할 때 그렇다.
## 어떻게 해결할까?
Proxy 패턴을 적용해 보자.
* Origin Service Object와 같은 interface를 구현한 proxy 클래스를 생성
* 모든 clients가 proxy에 접근하도록 한다.
* proxy는 client로 부터 요청을 받으면 Origin Service Object를 생성하고, 모든 작업을 위임한다.

이렇게 함으로서 Origin Service Object 의 변경 없이 Origin Service Object의 로직을 실행하기 전, 후에 무언가 필요한 작업을 실행시킬 수 있다.
## Proxy 패턴의 구조
![proxy패턴의구조](https://raw.githubusercontent.com/lingi-log/lingi-log/master/assets/images/study/designpattern/proxy_2.jpeg)
1. `ServiceInterface`는 Service의 인터페이스를 정의한다. Proxy는 Service Object처럼 동작하기 위해 이 인터페이스를 구현해야 한다.
2. `Service`는 필요한 비지니스 로직을 제공한다.
3. `Proxy`클래스에는 service object를 가리키는 reference field가 있다. `Proxy`가 특정 작업(lazy initialization, logging, access control, caching 등)을 마친 뒤 request를 service object에 전달한다.\
보통, proxy는 service object의 전체 life cycle을 관리한다.
4. 클라이언트는 동일한 인터페이스를 통해 서비스와 프록시 모두에서 작동해야한다. 이렇게하면 서비스 객체가 필요한 모든 코드에 프록시를 전달할 수 있다.
## 3rd-party 라이브러리와 Proxy 예시
Proxy로 어떻게 3rd-party 라이브러리의 lazy initialization과 caching을 구현하는 지 보여주는 예시 이다.
![proxy와3rdpartylib](https://raw.githubusercontent.com/lingi-log/lingi-log/master/assets/images/study/designpattern/proxy_3.jpeg)
Library는 video download 클래스를 제공한다. 하지만 이것은 매우 비효율적이다. 만약 Client application이 동일한 video를 여러 번 요청하면, 라이브러리는 그 파일을 캐싱해놓고 재사용하는 것이 아니라 계속해서 다운로드 한다.\
Proxy클래스는 원본 라이브러리와 같은 인터페이스를 구현하고 있으며 모든 작업 요청을 위임한다. 하지만 Client가 동일한 파일을 반복적으로 요청한다면, cache된 파일을 내려준다.\
아래의 psuedocode를 보고 이해해 보자.
```
// The interface of a remote service.
interface ThirdPartyYoutubeLib is
    method listVideos()
    method getVideoInfo(id)
    method downloadVideo(id)

// The concrete implementation of a service connector. Methods
// of this class can request information from YouTube. The speed
// of the request depends on a user's internet connection as
// well as YouTube's. The application will slow down if a lot of
// requests are fired at the same time, even if they all request
// the same information.
class ThirdPartyYoutubeClass implements ThirdPartyYoutubeLib is
    method listVideos() is
        // Send an API request to YouTube.

    method getVideoInfo(id) is
        // Get metadata about some video.

    method downloadVideo(id) is
        // Download a video file from YouTube.

// To save some bandwidth, we can cache request results and keep
// them for some time. But it may be impossible to put such code
// directly into the service class. For example, it could have
// been provided as part of a third party library and/or defined
// as `final`. That's why we put the caching code into a new
// proxy class which implements the same interface as the
// service class. It delegates to the service object only when
// the real requests have to be sent.
class CachedYoutubeClass implements ThirdPartyYouTubeLib is
    private field service: ThirdPartyYouTubeClass
    private field listCache, videoCache
    field needReset

    constructor CachedYoutubeClass(service: ThirdPartyYouTubeLib) is
        this.service = service

    method listVideos() is
        if (listCache == null || needReset)
            listCache = service.listVideos()
        return listCache

    method getVideoInfo(id) is
        if (videoCache == null || needReset)
            videoCache = service.getVideoInfo(id)
        return videoCache

    method downloadVideo(id) is
        if (!downloadExists(id) || needReset)
            service.downloadVideo(id)

// The GUI class, which used to work directly with a service
// object, stays unchanged as long as it works with the service
// object through an interface. We can safely pass a proxy
// object instead of a real service object since they both
// implement the same interface.
class YoutubeManager is
    protected field service: ThirdPartyYouTubeLib

    constructor YoutubeManager(service: ThirdPartyYouTubeLib) is
        this.service = service

    method renderVideoPage(id) is
        info = service.getVideoInfo(id)
        // Render the video page.

    method renderListPanel() is
        list = service.listVideos()
        // Render the list of video thumbnails.

    method reactOnUserInput() is
        renderVideoPage()
        renderListPanel()

// The application can configure proxies on the fly.
class Application is
    method init() is
        aYouTubeService = new ThirdPartyYouTubeClass()
        aYouTubeProxy = new CachedYouTubeClass(aYouTubeService)
        manager = new YouTubeManager(aYouTubeProxy)
        manager.reactOnUserInput()
```

## 사용법
### Lazy Initialization
### Access Control
### Local execution of a remote service
### Logging Request
### Caching request results
### Smart reference
## 구현방법
1. 존재하는 service interface가 없다면, proxy와 service object를 상호 교환 할 수 있는 interface를 하나 만든다. Service 클래스로 부터 interface를 뽑아내는 것은 항상 가능한 것은 아니다. interface를 뽑아내고 사용하기 위해 많은 곳을 변경해야 하기ㅏ 때문이다. 이럴 경우 대안으로 service 클래스를 상속받아 proxy를 만들 수 있다. 이 경우 proxy는 service 클래스의 interface를 상속받을 수 있다.
2. Proxy 클래스 에는 service의 reference를 담을 수 있는 필드가 필요하다. 보통 proxy는 service의 생명주기를 관리한다. 드물게 클라이언트가 생성자를 통해 service를 전달하기도 한다.
3. Proxy의 목적에 따라 method를 구현한다. 대부분의 경우, 특정 동작을 한 후, proxy는 작업을 service의 객체에 위임해야 한다.
4. 경우에 따라 프록시를 사용할 지, 실제 서비스 클래스를 사용할 지 결정할 수 있는 메소드를 제공할 수도 있다. 간단한 static 메소드 이거나 full-blown(완전한?) 팩토리 메소드를 통해.
5. Service object 를 lazy initialization 할 지 결정한다.
## 장단점
### 장점
* Client가 알 지 못하게 프록시를 적용할 수 있다.
* Service object의 life cycle을 관리할 수 있다.(when clients don’t care about it.)
* Service object가 생성되지 않았을 때, 사용 불가 상태일 때도 프록시는 이용할 수 있다.
* 개방/폐쇄 원칙을 따라 service나 client를 수정하지 않고 새로운 프록시를 생성, 사용할 수 있다.
### 단점
* 새 클래스가 많이 생성, 사용되기 때문에 코드가 복잡해 질 수 있다.
* Service에서의 응답이 지연될 수 있다.

----------
출처 : [https://refactoring.guru/design-patterns/proxy](https://refactoring.guru/design-patterns/proxy)