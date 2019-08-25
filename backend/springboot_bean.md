ApplicationContext는 bean에 대한 집합이라고 했습니다. bean은 일반적으로 POJO class로 구성이 되게 됩니다. bean과 POJO의 정의는 다음과 같습니다. 


Java Bean
원 목적은 Servlet에서 Java 객체를 가지고 와서 사용하기 위해서 작성된 객체입니다. 매우 간단한 객체이고, 사용이 편리해야지 된다. 라는 것을 원칙으로 가지고 있습니다. 특징으로는

# property를 갖는다. (private 변수와 get/set method를 갖는다.)
# serialization이 가능하다.

라는 특징을 갖습니다. 그렇지만 두번째 특징인 serialization이 가능한 특징은 지금은 거의 사용되고 있지 않습니다. property를 갖는 java 객체라는 의미로 생각해주시면 됩니다. 줄여서 bean이라는 표현을 많이 사용합니다. 

POJO
Plan Old Java Object의 약자입니다. POJO 객체는 특정 기술과 Spec에 독립적인 객체로 만들어지는 것을 원칙으로 삼습니다. 자신이 속한 package에 속한 POJO 객체 이외에는 Java의 기본 객체만을 이용해서 작성하는 것이 원칙입니다. 또한, 확장성을 위해 자신이 속한 package의 POJO 객체가 아닌 POJO 객체의 interface를 속성으로 갖는 bean 객체로서 만들어지는 것이 일반적입니다. 지금까지 작성된 Book, User, UserHistory 객체의 경우에 POJO 객체라고 할 수 있습니다. 

bean에 대한 집합인 ApplicationContext는 다음과 같은 특징을 갖습니다.

1. bean id, name, alias로 구분이 가능한 bean들의 집합입니다.
2. life cycle을 갖습니다. (singleton, prototype)
3. property는 value 또는 다른 bean을 참조합니다
