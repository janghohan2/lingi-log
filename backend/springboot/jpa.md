# JPA(Java Persistence API)
자바 객체와 데이터베이스 테이블 간의 매핑을 처리하는 ORM(Object Relational Mapping) 기술의 표준.
## 장단점
### 장점
* 개ㅐ발이 편리 - 기본적인 CRUD 작성 하지 않아도 됨.
* 데이터베이스에 독립적인 개발이 가능하다 - 데이터베이스에 종속적이지 않다. 사용 DB가 바뀌면 jpa가 해당 db에 맞는 쿼리 생성해 준다.
* 유지 보수가 쉽다.
### 단점
* 학습곡선이 크다 - 배워야 할게 많고, 튜닝 할 때도 어려움이 있음.
* 특정 DB에 종속적인 기능을 사용하지 못한다.
* 객체지향 설계가 필요
## 스프링 데이터 JPA
* JPA를 스프링에서 쉽게 사용할 수 있도록 해주는 라이브러리.
* Repository라는 인터페이스를 상속 받아 정해진 규칙에 맞게 메서드를 작성하면 개발자가 작성해야 할 코드 완성.
* JPA 구현체(JPA 프로바이더)로 하이버네이트 이용.
## 사용 예시
### application.properties
```properties
spring.jpa.database=mysql
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.datasource.url=jdbc:mariadb://localhost:33060/mngt
spring.datasource.username=root
spring.datasource.password=1234
spring.datasource.driverClassName=com.mysql.jdbc.Driver
```
### entity 파일 예시
```java
@NoArgsConstructor
@Getter
@Table(name="user")
@Entity
public class User{
    @Id
    private String username;

    @Column(length=100, nullable=false)
    private String password;
    
    @Column(name="IS_ACCOUNT_NON_EXPIRED")
    private boolean isAccountNonExpired;
    @Column(name="IS_ACCOUNT_NON_LOCKED")
    private boolean isAccountNonLocked;
    @Column(name="IS_CREDENTIALS_NON_EXPIRED")
    private boolean isCredentialsNonExpired;
    @Column(name="IS_ENABLED")
    private boolean isEnabled;

    @Builder
    public User(String username, String password){
        this.username = username;
        this.password = password;
        this.isAccountNonExpired = true;
        this.isAccountNonLocked = true;
        this.isCredentialsNonExpired = true;
        this.isEnabled = true;
    }
}
```
```java
@NoArgsConstructor
@Getter
@Table(name="authority")
@Entity
public class Authority{
    @Id
    private String id;

    @Column(name="AUTHORITY_NAME", length=20, nullable=false)
    private String authorityName;

    @Builder
    public Authority(String id, String authorityName){
        this.id = id;
        this.authorityName = authorityName;
    }
}
```

### Repository 파일 예시
```java
public interface AuthorityRepository extends JpaRepository<Authority, String>{
    @Query("select authorityName from Authority where id=:id")
    List<String> findAllById(@Param("id") String id);
        
}
```