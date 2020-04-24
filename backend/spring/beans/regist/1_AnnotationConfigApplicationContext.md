# 시작은 AnnotationConfigApplicationContext
## 설명
@Configuration 어노테이션이 붙은 특정 component classes를 input으로 받는 독립실행되는 application context 이다. 순수 @Component 타입 이나 javax.inject어노테이션을 사용한 SR-330 준수 클래스도 사용 가능하다.

register(Class...) 를 이용하거나 scan(classPathString...)를 이용해 클래스들을 하나씩 등록할 수 있다.

@Configuration가 여러 개 있는 경우, 뒷쪽 클래스에 정의된 @Bean 메소드는 앞서 등록된 것은 override 한다. 따라서 의도적으로 Override를 할 수도 있다.

## 클래스다이어그램
![](/assets/images/backend/spring/beans/AnnotationConfigApplicationContext_classdiagram.png)

## 소스
```java
package org.springframework.context.annotation;

...

public class AnnotationConfigApplicationContext extends GenericApplicationContext implements AnnotationConfigRegistry {

	private final AnnotatedBeanDefinitionReader reader;
	private final ClassPathBeanDefinitionScanner scanner;


	/**
	 * 기본 생성자.
     * AnnotatedBeanDefinitionReader와 ClassPathBeanDefinitionScanner에 this를 인자로 넘겨 
     * 생성하고 reader, scanner로 등록한다.
     * GenericApplicationContext을 보면 기본적으로 DefaultListableBeanFactory를 new로 생성해서 
     * 사용하는 것을 볼 수 있다.
	 */
	public AnnotationConfigApplicationContext() {
		this.reader = new AnnotatedBeanDefinitionReader(this);
		this.scanner = new ClassPathBeanDefinitionScanner(this);
	}

    ...

	//---------------------------------------------------------------------
	// Implementation of AnnotationConfigRegistry
	//---------------------------------------------------------------------

	/**
     * Class<?> 형태 배열을 받아서 reader.register를 호출
	 */
	@Override
	public void register(Class<?>... componentClasses) {
		Assert.notEmpty(componentClasses, "At least one component class must be specified");
		this.reader.register(componentClasses);
	}

	/**
     * Super 클래스인 GenericApplicationContext의 
     * registerBean(@Nullable String beanName, Class<T> beanClass, @Nullable 
     * Supplier<T> supplier, BeanDefinitionCustomizer... customizers)를 
     * Override 한다.
     * 
     * reader.registerBean을 호출한다.
	 */
	@Override
	public <T> void registerBean(@Nullable String beanName, Class<T> beanClass,
			@Nullable Supplier<T> supplier, BeanDefinitionCustomizer... customizers) {

		this.reader.registerBean(beanClass, beanName, supplier, customizers);
	}

}

```

AnnotatedBeanDefinitionReader
ClassPathBeanDefinitionScanner