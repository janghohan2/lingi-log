# Kill과 trap
shell script를 kill 할 때 하던 작업을 모두 완료한 후 process를 죽여야 했다. 지금까진 그냥 kill을 했었는데 중간에 kill 하면 데이터가 유실되는 상황 이 있었고 그게 문제가 되었다. 해결법을 이리 저리 찾아보다 적절한 방법을 찾게되어 기록한다.

## 해결방법
일정 count 만큼 loop를 돌면 shell이 재실행 되지만 그 때까지 마냥 기다릴 순 없었다. 처음엔 shell이 작업하지 않는 타이밍을 찾으려 했다. 하지만 정확한 시점을 찾기가 어려워 보였다. 
강제로 종료하는 것이 아니고 작업을 모두 마치고 종료하는 방법이 뭐가 있을까 고민하다 문득 어디에선가 ‘graceful shutdown’이라는 로그를 본 기억이 났다. shell script graceful shutdown 이라는 키워드로 검색을 했고, 문제 해결의 힌트를 얻을 수 있었다. 

kill 명령어의 signal 옵션이 여러 개 있고, 그 중 15(SIGTERM) 옵션을 사용하면 shell 파일 내에서 trap을 통해 signal에 대한 처리를 할 수 있다는 것을 알게 되었다. 그래서 이를 응용하여 아래와 같이 처리 했다. 

```bash
# trap for graceful shutdown 
TERM_SIGNAL="N" 
function gracefully_shutdown () 
{ 
TERM_SIGNAL="Y" 
} 
trap 'gracefully_shutdown' TERM 
... 

if [ "$TERM_SIGNAL" == "Y" ]; then 
... 
fi
```	

코드 설명 : SIGTERM 시그널을 받으면 trap으로 등록해 둔 gracefully_shutdown 함수가 실행되고, 종료되는 대신 TERM_SIGNAL 값을 ‘Y’로 변경 해준다. 중간에 로직을 모두 처리하고, 마지막에 if 문에서 TERM_SIGNAL 값을 검사하고 종료 여부를 결정한다. 

## 결과
테스트 결과 예상대로 동작함을 확인하였다. 

지금까진 내가 해결해야 했던 문제들은 누군가 이미 겪었고, 해결 방법이 있는 문제들이었다. 그래서 지금까진 문제 해결을 위해 문제 상황을 잘 정리하고, 키워드를 뽑아서 검색을 잘 하는 능력이 중요했었다. 하지만 앞으로 누군가의 경험을 참조하지 못하고 온전히 내가 헤쳐나가야 할 문제를 만날 수 있다고 생각한다. 이런 상황을 해결하기 위해 어떤 훈련이 필요할지 고민이 된다.