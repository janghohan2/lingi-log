# gcc 설치
> yum install gcc 하면 편하지만,\
> 네트워크를 사용할 수 없는 상황이라 yum을 사용할 수 없었다.

## source code 빌드 방법
1. https://ftp.gnu.org/gnu/gcc/gcc-6.4.0/ 접속해서 gcc-6.4.0.tar.gz 다운로드!
2. 다운받은 gcc-6.4.0.tar.gz파일을 usb에 담아 centos7에 옮긴다.
3.  다음 명령어 수행!
```bash
$ tar -xzf gcc-6.4.0.tar.gz 
$ mkdir build
$ cd build
$ ../gcc-6.4.0/configure
$ sudo make
$ sudo make install
```
> 이렇게 하려 했으나, gcc를 설치하기 위해 여러 의존성 패키지들이 필요했다.\
> 결국엔

## local install을 이용한 방법
* internet이 되는 환경에서 `downloadonly` 옵션을 사용하여 gcc와 의존성패키지를 모두 받은 후
```bash
# (pc with internet connection)
$ yum install gcc --downloadonly --downloaddir=(your dir)
```
* gcc를 설치해야 하는  pc에 복사한 후 

* 아래 명령어를 사용해서 설치했다.
```bash
# (pc without internet connection)
yum --nogpgcheck localinstall -y *.rpm
```
--nogpgcheck : gpg 키 인증을 생략한다는 뜻