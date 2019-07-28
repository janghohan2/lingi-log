# RxJS
>* Observable
>* Observer
>* Subscription
## Observable
* 관찰할 수 있는 대상
* OBservable 안에서 발생하는 데이터.
* 숫자, 문자열, 배열과 같은 일반적인 값 뿐만 아니라, Ajax통신 결과, 웹소켓, 사용자 이벤트 등 데이터를 만들어내는 것은 무엇이든 Obsesrvable로 만들 수 있다.
* 데이터에 관심이 있는 주체에게 데이터를 전달하기 위함.
* Subscribe 메서드 가지고 있음. Observer 등록하는 역할.
    * Observer는 Observable이 전달하는 데이터를 전달받을 수 있음.
* 이벤트도 데이터로서 스트림화가 가능함.
## Observer
* Observable에서 발생하는 데이터를 관찰하는 주체
* Observer는 next, error, complete라는 세 종류의 메서드를 가진 객체.
* Observer가 데이터 구독을 시작할 때, OBservable은 Subscriptipon을 반환함.
    * Observer에서 더 이상 Observable의 데이터를 구독하고 싶지 않을 때, 구독을 취소하는 기능을 하는객체.
## Subscriptiopn
* Observable은 subscribe매서드로 구독할 수 있으며
* subscribe 메서드는 subscription을 return 한다.
## Subject
* Subject는 observer이면서 observable이기 때문에 subscribe, next, complete을 직접할 수 있다.
* reactive 코드와 그렇지 않은 코드를 연결할 때 사용될 수 있다고 하는데, 무슨 말인지 아직 정확히 이해를 못했다.
* Subject를 통해 subject를 구독하는 모든 observer들에게 알려줄 수 있다. (notify 역할)
## RxJS Operator
> 로직 수행 후 다시 변환된 Observable을 반환함.
* fromEvent
    * 엘리먼트로부터 이벤트를 관찰하는 역할
* pluck
    * 엘리먼트로부터 value값을 가져오는 역할
* filter
    * Observable을 걸러네는 역할
* debounce
    * 실행되는 여유시간을 줌.
    * Request가 단시간에 여러 번 갈 수 있기 때문에
* distinctUtilChanged
    * 중복된 이벤트 제거
* flatMapLatest
    * 이전에 ㅁㄴ들어진 Observabl을 무시하고 가장 마지막의 Observable을 새로운 Observable로 만등러주는 Operator


## 예를 들어
```js
const subscribeFn = function(observer){
    observer.next('OBSERVE~');
};

const myFirstObservable = new Rx.Observable(subscribeFn);

myFirstObservable.subscribe((d)=>console.log(d));

// 출력 : OBSERVE~ 
```

## 다시 정리
* Observable은 Observerㄹㄹ subscribe 메서드로 전달받을 수 있음.
* Observer는 next, error, complete메서드를 포함한 객체.
* Observable은 데이터 소스를 Observer와 연결하여 로직에 따라 자신에게 등록된 next, error, complete 메서드를 호출.

## 예제 2
```js
const number$ = Rx.Observable.create((observer) => {
    let myCounter = 0;
    const producerFn = () => observer.next(myCounter++);

    const intervalId = setInterval(producerFn, 1000);

    const finishFn = () => {
        clearInterval(intervalId);
        observer.complete();
    }
    setTimeout(finishFn, 10*1000);

    return finishFn;
});

const subscription = number$.subscribe((n) => console.log(`streaming... ${n}`));

setTimeout(() => subscription.unsubscribe(), 5*1000);
```

* 설명
    * 1번줄 : Observable.create 메서드 사용하여 Observable 생성.
        * create 메서드는 내부적으로 new Observable(subscriber)를 호출.
    * 
## naming 규칙
* 이름 뒤에 붙은 `$`
    * Observable이 연속적으로 발생 가능한 스트림일 경우에 변수 후위에 붙임.

## promise, ajax와 다른 점?
* RxJS의 풍부한 연산자~
    * map, filter, reduce