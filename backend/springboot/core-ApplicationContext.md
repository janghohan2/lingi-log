# ApplicationContext
IoC, AOP를 설정하는 Container 또는 Configuration.
* bean의 집합
* bean에 대한 Map
* bean에 대한 정의
* AOP에 의한 bean의 확장에 대한 정의

## ApplicationContext는 이렇게 생겼다.
```java
public interface ApplicationContext extends EnvironmentCapable, ListableBeanFactory, HierarchicalBeanFactory,
        MessageSource, ApplicationEventPublisher, ResourcePatternResolver {
    String getId();
    String getApplicationName();
    String getDisplayName();
    long getStartupDate();
    ApplicationContext getParent();
    AutowireCapableBeanFactory getAutowireCapableBeanFactory() throws IllegalStateException;
}
```