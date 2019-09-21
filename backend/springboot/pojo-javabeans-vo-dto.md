# POJO vs JAVA BEANS vs VO vs DTO
구분하기가 쉽지 않다. 정리해보자.
## POJO
이상적으로, POJO는 자바 언어 사양 외에 어떠한 제한에도 묶이지 않은 자바 오브젝트라고 할 수 있다.\
가독성과 재사용성을 향상시킨다.\
아래와 같은 예는 pojo가 아니다.
* 미리 정의된 클래스의 확장. 예:
    ```java
    public class Foo extends javax.servlet.http.HttpServlet { ...
    ```
* 미리 정의된 인터페이스의 구현. 예:
    ```java
    public class Bar implements javax.ejb.EntityBean { ...
    ```
* 미리 정의된 애너테이션을 포함. 예:
    ```java
    @javax.persistence.Entity public class Baz { ...
    ```
그러나 기술적 어려움이나 기타 이유로 인해 POJO 호환으로 기술하고 있는 수많은 소프트웨어 제품이나 프레임워크들은 실제로 정상 동작을 위해 퍼시스턴스(persistence)와 같은 기능을 위해 미리 정의된 애너테이션의 사용을 요구하고 있다.[POJO-wikipedia](https://ko.wikipedia.org/wiki/Plain_Old_Java_Object)
### 이런게 POJO다
```java
public class Employee {
    String name;
    public String id;
    private double salary;
    public Employee(String name, String id, double salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    public String getName() {return name;}
    public String getId() {return id;}
    public Double getSalary() {return salary;}
}
```
위의 예시는 잘 작성된 pojo의 예 이다. 접근제어자에 대한 제한이 없고, constructor도 별다른 제한이 없다.


### POJO와 JAVA BEAN
Beans are special type of Pojos. There are some restrictions on POJO to be a bean.\
POJO의 예시와 비교해보면
```java
public class Employee implements java.io.Serializable {  
   private int id;  
   private String name;  
   public Employee(){}  
   public void setId(int id){this.id=id;}  
   public int getId(){return id;}  
   public void setName(String name){this.name=name;}  
   public String getName(){return name;}  
} 
```

1. All JavaBeans are POJOs but not all POJOs are JavaBeans.
2. Serializable i.e. they should implement Serializable interface. Still some POJOs who don’t implement Serializable interface are called POJOs beacause Serializable is a marker interface and therefore not of much burden.
3. Fields should be private. This is to provide the complete control on fields.
4. Fields should have getters or setters or both.
5. A no-arg constructor should be there in a bean.
6. Fields are accessed only by constructor or getter setters.

POJO|JAVA BEAN
-|-
It doesn’t have special restrictions other than those forced by Java language.|It is a special POJO which have some restrictions.
It doesn’t provide much control on members.|It provides complete control on members.
It can implement Serializable interface.|It should implement serializable interface.
Fields can be accessed by their names.|Fields are accessed only by getters and setters.
Fields can have any visiblity.|Fields have only private visiblity.
There can be a no-arg constructor.|It must have a no-arg constructor.
It is used when you don’t want to give restriction on your members and give user complete access of your entity|It is used when you want to provide user your entity but only some part of your entity.

## VO
Value Object는 `java.lang.Integer`처럼 값을 가지고 있는 Object이다. [Martin Fowler의 설명](https://martinfowler.com/bliki/ValueObject.html)을 참조하면 이해가 잘 될듯. Enterprise Application Architecture 패턴에서 보면, Money나 date range object같은 작은 object(small objet)는 reference 보다는 object의 value 그 자체가 중요하다.\
You can usually tell them because their notion of equality isn't based on identity, instead two value objects are equal if all their fields are equal. Although all fields are equal, you don't need to compare all fields if a subset is unique - for example currency codes for currency objects are enough to test equality.(??ㅠ_ㅠ)\
일반적으로 VO는 immutable하다. VO의 value를 바꾸기(update) 위해선 VO를 새로 만들어야 한다.


Integer 클래스를 예로 들면
```java
...
private final int value;

@Deprecated(since="9")
public Integer(int value) {
    this.value = value;
}
...
```
```java
public class Test {
	public static void main(String[] args) {
		Integer i1 = new Integer(1);
		Integer i2 = new Integer(1);

		System.out.println(i1 == i2);       //false
		System.out.println(i1.equals(i2));  //true
	}
}
```
## DTO
DTO(Data Transfer Object)는 SW의 각 계층간 데이터 전송을 위해 사용된다. DTO는 종종 DAO와 함께 사용된다. DAO나 business object와 다른 점은, DTO는 오직 자체 데이터 저장, 검색(retrieve) 하는 동작만 한다.(getter, setter 얘기 인듯.)\
In a traditional EJB architecture, DTOs serve dual purposes: first, they work around the problem that entity beans are not serializable; second, they implicitly define an assembly phase where all data to be used by the view is fetched and marshalled into the DTOs before returning control to the presentation tier.

## 결론?!
많은 사람들은 VO와 DTO를 동일하게 생각한다.\
VO와 DTO는 JavaBeans의 컨벤션을 따르므로 JavaBeans라고생각해도 됨.\
그리고 JavaBeans는 POJO 이므로 VO와 DTO를 POJO라고 생각하면 된다.

------
POJO vs Java Beans - https://www.geeksforgeeks.org/pojo-vs-java-beans/
Difference between DTO, VO, POJO, JavaBeans? - https://stackoverflow.com/questions/1612334/difference-between-dto-vo-pojo-javabeans