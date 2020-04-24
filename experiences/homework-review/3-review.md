# 리뷰
아래와 같은 피드백을 받았다.
* DTO클래스를 불변으로. 
* 불필요하거나 정리가 되지 않은 클래스들이 보입니다.
* 코드 스타일을 조금 고려할 필요가 있어보입니다.
* 패키지명을 조금 고민해서 지었으면 좋았을 것 같습니다.
* Field Injection을 사용했습니다.

하나씩 알아보자.
## DTO클래스를 불변으로. 
음.. 일단 소스를 보자
```java
@PostMapping
ResponseEntity<?> addPlaylist (
        @RequestHeader("UserId") int userId,
        @RequestBody @Valid Playlist playlist
){

    playlist.setUserId(userId); // 이 부분에서 DTO 의 변경이 일어난다.
    playlistService.addPlaylist(playlist);

    ...
}
```
### 왜?


## 불필요하거나 정리가 되지 않은 클래스들이 보입니다.
## 코드 스타일을 조금 고려할 필요가 있어보입니다.
## 패키지명을 조금 고민해서 지었으면 좋았을 것 같습니다.
## Field Injection을 사용
구글에 검색해 보면 Field Injection이 가진 몇 가지 문제점을 찾을 수 있다. 대표적인 문제점이 --- 이다. 스터디 에서도 몇번 이 주제로 이야기를 나눴던 적이 있는데, 나는 몇가지 문제점이 있다 하더라도 기존 사용하던 스타일이 있으면 그대로 따르는 것이 좋다고 생각했고, 과제는 작은규모라 간단하게 Field Injection을 사용해도 상관 없을 것 같았다. 사실 이 점이 가장 컸다. 간단하게 사용 가능하기 때문에...

그런데 얼마 전 인터넷을 보다 Constructor Injection을 Field Injection 처럼 간단하게 할 수 있는 방법을 보게되었다.

바로 이렇게~
```java
@RequiredArgsConstructor // Constructor Injection을 위한 lombok 어노테이션
public class AClass {
    private final BClass bclass; // Constructor Injection을 받음
}
```

간단하다... 앞으로 이 방식을 애용할 것 같다.
