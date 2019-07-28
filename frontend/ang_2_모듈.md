# 모듈
Angular는 모듈 단위로 애플리케이션의 코드를 인식한다.\
Angular의 Module에 대해 알아보면, 아래와 같은 내용을 찾아볼 수 있다.

## 조사
* angular는 모듈 단위로 코드를 인식한다. 따라서 모든 Angular 어플리케이션은 반드시 하나 이상의 Module을 가지게 된다.
* 앵귤러 안에서 관련된 요소를 하나로 묶어 애플리케이션을 구성하는 단위.
* Tree형태로 구성되며, 최상단에 위치한 Module을 Root Module이라 한다.
* Every Angular app has a root module, named AppModule, which provides the mechanism that launches the application.
    * 모든 Angular app은 root 모듈을 가지고 있고, AppModule이라 부른다. application을 실행하는 메커니즘을 제공한다.
    * 보통 app.module.ts 파일에 작성한다.
* 모든 앵귤러 애플리케이션은 반드시 하나의 모듈을 가짐
    * Root Module이고, App Module이라 부름.

### Module의 구성요소
AppModule의 소스를 보면 아래와 같이 생겼다.
```typescript
@NgModule({
    imports: [
        ...
    ],
    providers: [
    ...
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```
* `@NgModule` 데코레이터
    * Module은 `@NgModule`이라는 데코레이터가 붙는 클래스로 선언 됨.
    * `@NgModule`의 구성요소
        * bootstrap - 루트 컴포넌트라고 하는 메인 애플리케이션의 뷰를 선언. Root 모듈에만 존재
        * declarations - 뷰 클래스 정의.(컴포넌트, 디렉티브, 파이프 세가지의 뷰 클래스가 있다.)
        * export : 다른 모듈이나 컴포넌트 템플릿에서 접근할 수 있도록 이부로 공개 선언
        * imports : 다른 컴포넌트의 템플릿 사용(imort로 선언된 것 중) this 사용 가능(?)
        * providers : 전역에서 사용되는 서비스를 해당 객체에서 사용할 수 있도록 생성, 접근. 앱의 모든 곳에서 접근 가능.
### lazy load
#### benefits
* You can load feature areas only when requested by the user.
* You can speed up load time for users that only visit certain areas of the application.
* You can continue expanding lazy loaded feature areas without increasing the size of the initial load bundle.
* Modules in Angular can be lazy loaded which means that they are loaded when needed, not always! 
    * Lazy loading significantly improves performance of an Angular app.

#### 구현 형식
* app-routing.module.ts
    ```typescript
    const routes: Routes = [
        {
            path: '',
            canActivate: [UserAuthenticateService],
            children: [
                ...
                {
                    path: 'settings',
                    loadChildren: './content/settings/settings.module#SettingsModule'
                }
            ]   
        },
        {
            path: 'auth/login',
            component: AuthenticateLoginComponent
        }
    ];

    @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
    export class AppRoutingModule {}
    ```
    * CanActivate Guard
        * Applications often restrict access to a feature area based on who the user is. You could permit access only to authenticated users or to users with a specific role. You might block or limit access until the user's account is activated.
        * The CanActivate guard is the tool to manage these navigation business rules.


* settings-routing.module.ts
```typescript
const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                component: AccountSettingComponent
            },
            {
                path: 'account',
                component: AccountSettingComponent
            },
            {
                path: 'server',
                component: ServerSettingComponent
            },
            {
                path: 'agent-program',
                component: SettingsAgentProgramComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
```