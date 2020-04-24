# AnnotatedGenericBeanDefinition
## 설명
GenericBeanDefinition을 상속받아 확장한 클래스. AnnotatedBeanDefinition을 통해 annotation metadata 처리도 가능하다.

GenericBeanDefinition을 확장한 클래스로, AnnotatedBeanDefinition을 사용해 테스트하는 데 많이 사용된다.  


## 클래스다이어그램
![](/assets/images/backend/spring/beans/AnnotatedGenericBeanDefinition_diagram.png)
```java
package org.springframework.beans.factory.annotation;

@SuppressWarnings("serial")
public class AnnotatedGenericBeanDefinition extends GenericBeanDefinition implements AnnotatedBeanDefinition {

	private final AnnotationMetadata metadata;

	@Nullable
	private MethodMetadata factoryMethodMetadata;

	public AnnotatedGenericBeanDefinition(Class<?> beanClass) {
		setBeanClass(beanClass);
		this.metadata = AnnotationMetadata.introspect(beanClass);
	}

	public AnnotatedGenericBeanDefinition(AnnotationMetadata metadata) {
		Assert.notNull(metadata, "AnnotationMetadata must not be null");
		if (metadata instanceof StandardAnnotationMetadata) {
			setBeanClass(((StandardAnnotationMetadata) metadata).getIntrospectedClass());
		}
		else {
			setBeanClassName(metadata.getClassName());
		}
		this.metadata = metadata;
	}

	public AnnotatedGenericBeanDefinition(AnnotationMetadata metadata, MethodMetadata factoryMethodMetadata) {
		this(metadata);
		Assert.notNull(factoryMethodMetadata, "MethodMetadata must not be null");
		setFactoryMethodName(factoryMethodMetadata.getMethodName());
		this.factoryMethodMetadata = factoryMethodMetadata;
	}


	@Override
	public final AnnotationMetadata getMetadata() {
		return this.metadata;
	}

	@Override
	@Nullable
	public final MethodMetadata getFactoryMethodMetadata() {
		return this.factoryMethodMetadata;
	}
}
```