# alias 설정
실 서비스에서 운영할 방법을 찾던 중 alias 개념을 알게 되었다.\
alias를 사용하면 index를 조금 더 자유롭게 다룰 수 있다.\
운영 정책을 정하고 그에맞춰 자동화 시킬 수 있을 것 같다.
## 사용 예
### 월 별 인덱스 생성 시
elastic search의 운용 방식을 
* component good 인덱스엔 한달 치 데이터를 저장한다.
* 데이터는 최대 6개월 저장한다. 
* 6개월 치 데이터를 한 개의 alias(my_index) 로 설정한다.

고 정했을 떄, my_index alias에
* 19년 8월 현재
    * my_index_good_19_03 ~ my_index_good_19_08

이렇게 인덱스가 설정되어 있고,
* 19년 9월이 되면
    * my_index_good_19_03은 alias에서 remove하고
    * my_index_good_19_09 인덱스를 생성해서 my_index alias에 추가한다.
