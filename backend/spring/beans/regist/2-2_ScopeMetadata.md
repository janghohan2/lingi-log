# ScopeMetadata
## 설명

스코프 이름과 스코프 프록시 동작을 포함하여 스프링이 관리하는 Bean의 스코프 특성을 설명한다. 기본 범위는 "싱글톤"이며, 기본값은 scoped-proxies를 만들지 않는 것이다.

```java
package org.springframework.context.annotation;

public class ScopeMetadata {

	private String scopeName = BeanDefinition.SCOPE_SINGLETON;
	private ScopedProxyMode scopedProxyMode = ScopedProxyMode.NO;


	/**
	 * Set the name of the scope.
	 */
	public void setScopeName(String scopeName) {
		Assert.notNull(scopeName, "'scopeName' must not be null");
		this.scopeName = scopeName;
	}

	/**
	 * Get the name of the scope.
	 */
	public String getScopeName() {
		return this.scopeName;
	}

	/**
	 * Set the proxy-mode to be applied to the scoped instance.
	 */
	public void setScopedProxyMode(ScopedProxyMode scopedProxyMode) {
		Assert.notNull(scopedProxyMode, "'scopedProxyMode' must not be null");
		this.scopedProxyMode = scopedProxyMode;
	}

	/**
	 * Get the proxy-mode to be applied to the scoped instance.
	 */
	public ScopedProxyMode getScopedProxyMode() {
		return this.scopedProxyMode;
	}

}

```