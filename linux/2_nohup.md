# nohup 명령어
회사에서 웹서비스 패치를 진행하던 중 발생한 에러를 해결 하며 정리해본다.

## 상황
### 문제 상황
* java 에서 특정 shell script를 수행하는데, shell script 완료 후 return을 받지 못해 다음 로직을 진행하지 못한다.

### 해결 방법
* shell script 안에는 `nohup /my/diredctory/shellscript.sh &` 로직이 있었고, 이 로직을 `nohup /my/diredctory/shellscript.sh > /dev/null 2>&1  &` 로 변경하고 해결하였다.

## nohup이란?
* nohup은 HUP(hangup) 신호를 무시하도록 만드는 POSIX 명령어이다. HUP 신호는 전통적으로 터미널이 의존 프로세스들에게 로그아웃을 알리는 방식이다. 일반적으로 터미널로 향하는 출력은 별도로 넘겨주기 처리를 하지 않았을 경우 `nohup.out`이라는 이름의 파일로 출력된다.(wiki, https://ko.wikipedia.org/wiki/Nohup)
* nohup은 daemon 형태로 프로세스를 실행한다고 한다.

### 사용 예시
* `nohup`으로 특정 프로세스를 실행시킬 때 백그라운드로 실행시키고 싶다면 `&`기호와 같이 사용한다.
* 


## 사용
* 