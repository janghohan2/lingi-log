# 자주 쓰는 명령어
> 리눅스 서버 운영을 하며 자주 쓰는 명령어를 정리해 보자!\
> 매번 필요할 때 마다 검색해서 사용하다 보면 까먹기 때문에 한곳에 정리를 해보려 한다.

## mkdir
### 디렉터리 생성
* mkdir new_directory
### 하위 디렉터리까지 한번에 생성
* mkdir -p new_directory/new_directory2

## touch
### 파일 생성 
* touch text_file.txt

## ls
### 파일 개수 출력
* ls | wc -l
### 현재 경로의 디렉터리 명 출력
* ls -l ./ | grep ^d | awk '{print $9}'

## tail
### 로그 출력
* tail -f catalina.out
### 특정 문자열 포함한 로그만 출력
* tail -f catalina.out | grep test

## tar
### tar 압축 풀기
* tar -zxf test.tar
### tar.gz 압축 풀기
* tar -zxvf test.tar.gz

## sed
### 파일의 특정 문자열 앞에 문자열 삽입
* sed -i ".bak" "/${TARGET_STRING}/i\\
                '${INSERT_STRING}'," ${TARGET_FILE}
    * linux 에서 사용할 때와 다르게, mac에서 사용할 때는 개행을 해줘야 한다.

## move
### 파일 이동 
### 파일 이름 변경 

## rename
### 파일 이름 변경 

## find 
### 파일 찾기 

