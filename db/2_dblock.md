# db lock 분석
## 현상
Dead Lock 에러가 났다.(Deadlock found when trying to get lock; try restarting transaction)

![deadlock에러메시지](https://raw.githubusercontent.com/lingi-log/lingi-log/master/assets/images/db/deadlock_err_msg.PNG)
## 분석
### 1차 분석
* 쿼리 확인 결과 특정 쿼리(table 에 access time 컬럼 update)에서 지속적으로 발생하고 있었다.
* 쿼리 where절에 사용 되는 컬럼을 보니 key가 잡혀있지 않았다.
### 2차 분석
* 정확한 원인 파악 위해 현상을 재현해 보았다.
    * 문제의 쿼리를 실행하는 요청을 20초에 18번(실제 고객사에서 발생하는 요청 빈도에 맞춰) 발생
    * 해당 컬럼 사용하는 다른 요청 발생
    * 2시간 후 발생하였고 show engine innodb status 쿼리를 통해 확인해 보았다.
    ```
    ------------------------
    LATEST DETECTED DEADLOCK
    ------------------------
    2020-01-10 18:16:32 7fee7a600700
    *** (1) TRANSACTION:
    TRANSACTION 92465172, ACTIVE 0 sec fetching rows
    mysql tables in use 1, locked 1
    LOCK WAIT 3 lock struct(s), heap size 360, 6 row lock(s), undo log entries 1
    MySQL thread id 949396, OS thread handle 0x7fef8cfb6700, query id 28309277 127.0.0.1 root updating
    UPDATE    {tbl_a}   SET    {date_col} = now()   WHERE    {client_key} = '{value}'
    *** (1) WAITING FOR THIS LOCK TO BE GRANTED:
    RECORD LOCKS space id 981 page no 3 n bits 128 index `PRIMARY` of table `kmng`.`t_asset_equi` trx id 92465172 lock_mode X waiting
    *** (2) TRANSACTION:
    TRANSACTION 92465171, ACTIVE 0 sec starting index read
    mysql tables in use 36, locked 36
    5 lock struct(s), heap size 1184, 3 row lock(s)
    MySQL thread id 949674, OS thread handle 0x7fee7a600700, query id 28309288 localhost root Sending data
    update {tbl_b} b, 
            (
                SELECT 
                    {columns...}
                    (SELECT MACHIN_ID FROM {tbl_a} a WHERE {client_key} = '{value}) as MACHIN_ID,
                    {columns...}
    *** (2) HOLDS THE LOCK(S):
    RECORD LOCKS space id 981 page no 3 n bits 128 index `PRIMARY` of table {tbl_a} trx id 92465171 lock mode S locks rec but not gap
    *** (2) WAITING FOR THIS LOCK TO BE GRANTED:
    RECORD LOCKS space id 981 page no 3 n bits 128 index `PRIMARY` of table {tbl_a} trx id 92465171 lock mode S waiting
    *** WE ROLL BACK TRANSACTION (1)
    ```
    분석을 해보면 
    1. 92465172번 트랜잭션이 T_ASSET_EQUI 테이블을 update를 하기 위해 space id 981 page no 3 부분에  lock_mode X를 거려고 기다리고 있고 
    2. 92465171번 트랜잭션이(tranjaction 번호가 더 빠른것으로 보아 먼저 실행된 거로 보인다) space id 981 page no 3 부분에 mode S locks을 걸고 있고, space id 981 page no 3 부분에 또 lock mode S를 걸기 위해 기다리고 있다.
    3. 로그 마지막 부분을 보면 교착상태를 해소하기 위해 92465172번 트랜잭션을 rollback 한다고 나와있다.
    4. 추가적으로, 92465171번 트랜잭션이 mode S locks을 건 row에 왜 한번 더 mode S locks을 걸려고 하는지 분석이 필요해 보인다.
## 조치
### 1차 조치
* where절에 사용 되는 컬럼에 unique key를 걸었다.
### 2차 조치
* view 테이블을 만들어 그곳에서 select를 하게 하면 될것같다고 생각해서 변경 후 테스트 해봤으나 동일하게 오류가 났다.
* 프로시저 안에서 문제가 되는 테이블을 select 하지 않고 외부에서 프로시저에 파라미터를 넘기는 방식으로 변경하기로 했다.
## 결과 
* 문제가 해결되기를 기대했으나 동일한 증상이 발생하였다.

## 기타
추가적으로 프로시저에서 왜 문제가된 row에 lock을 두 번 거는지 원인을 파악해봐야겠다.


# Shared and Exclusive Locks
The two standard row-level locks are share locks(S) and exclusive locks(X).

A shared lock is obtained to read a row, and allows other transactions to read the locked row, but not to write to the locked row. Other transactions may also acquire their own shared locks.

An exclusive lock is obtained to write to a row, and stops other transactions from locking the same row. It's specific behavior depends on the isolation level; the default (REPEATABLE READ), allow other transactions to read from the exclusively locked row.(https://mariadb.com/kb/en/innodb-lock-modes/)