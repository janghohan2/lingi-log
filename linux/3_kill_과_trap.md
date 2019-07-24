# kill 과 trap
>kill : process를 죽이는 명령어 이다.\
`kill -9 pid` 형태로 주로 사용했는데,\
kill 옵션과 signal을 받아 제어할 수 있는 `trap` 명령에 대해 알아본 내용을 정리하려고 한다. 

## kill 명령어
* 프로세스에 특정한 signal을 보내는 명령어.

## kill의 다양한 옵션들
* `kill -l` 을 입력하면 kill 의 다양한 옵션들을 사용할 수 있다.
```bash
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
```
* 지금은 `9(SIGKILL)`, `15(SIGTERM)` 에 대해 알아보았다.

### SIGKILL - 9
* 해당 프로세스의 실행을 강제로 중지한다. `TERM` 시그널로 종료되지 않는 프로세스도 이 시그널로 강제 종료할 수 있다.

### SIGTERM - 15
* 정상적인 종료 프로세스에 정의되어 있는 정상적인 종료 방법에 읳 ㅐ프로세스를 종료하게 되다. kill 명령어에 특별한 시그널을 붙이지 않으면 이 시그널을 이용하여 프로세스를 종료함.

## trap 명령어
* signal이 도착했을 때 프로그램이 어떤 반응을 할 지 관리하도록 하는 명령.
> ### signal
> * 비동기 메시지로 정의됨.
> * 하나의 프로세스 에서 다른 프로세스로 보낼 수 있는 숫자.
> * 어떤 키가 눌러졌거나, 예외가 발생하면 운영체제에서 처리함.

### 사용 예시
* term signal이 도착했을 때, 하던 작업을 모두 완료 한 후 process를 죽여야 했다.
* 해당 sh 파일은 while로 한번 실행되면 멈추지 않고 실행된다.
* `TERM_SIGNAL`이라는 플래그를 정의하고, `SIGTERM`이 왔을 때 플래그를 변경, sh 파일 맨 끝에 종료하는 로직을 구현하였다.
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