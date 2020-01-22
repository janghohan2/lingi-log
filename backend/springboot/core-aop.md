# AOP
Aspect-oriendted Programming (AOP)은 OOP를 보완하는 수단으로, 흩어진 Aspect를
모듈화 할 수 있는 프로그래밍 기법. 흩어진 관심사 (Crosscutting Concerns)

## AOP 구현체
* 자바
    * AspectJ
    * 스프링 AOP
* AOP 적용 방법
    * 컴파일
    * 로드 타임
    * 런타임
## 스프링 AOP: 프록시 기반 AOP
스프링 AOP 특징
* 프록시 기반의 AOP 구현체
* 스프링 빈에만 AOP를 적용 할 수 있다.
* 모든 AOP 기능을 제공하는 것이 목적이 아니라, 스프링 IoC와 연동하여 엔터프라이즈
애플리케이션에서 가장 흔한 문제에 대한 해결책을 제공하는 것이 목적

스프링 IoC 컨테이너가 제공하는 기반 시설과 Dynamic 프록시를 사용하여 여러
복잡한 문제 해결.
* 동적 프록시: 동적으로 프록시 객체 생성하는 방법
* 자바가 제공하는 방법은 인터페이스 기반 프록시 생성.
* CGlib은 클래스 기반 프록시도 지원.
* 스프링 IoC: 기존 빈을 대체하는 동적 프록시 빈을 만들어 등록 시켜준다.
* 클라이언트 코드 변경 없음.
* AbstractAutoProxyCreator implements BeanPostProcessor

## 사용법