# 이벤트 루프

> 비동기 함수의 호출스택 추론을 위해서는 이벤트루프의 이해가 필요하다.

![](https://images.velog.io/images/mk928000000/post/ac30e65a-096b-4747-b9dc-cf1cdb7c865b/%EA%B5%AC%EC%A1%B0.PNG)



### 호출스택 추론

```
<script>
  function fly (){
      console.log('3초 후 날기');
  }

  console.log('시작');
  setTimeout (fly, 3000);
  console.log('끝');
</script>
```

**위의 스크립트가 실행되었을 때의 호출스택을 알아보자.
**

1. 파일이 시작되면 `anonymous` 가 호출스택에 기본적으로 깔린다.

 	`[anonymous]`
    

2. 메모리에 함수 fly 가 선언된다. 

3. console.log('시작') 실행 -> 호출스택에 console.log 가 쌓인다

 	`[console.log]`
	`[ anonymous ]`

4. 콘솔창에 '시작' 기록하고 console.log 가 끝난다 -> 호출스택에서 console.log 사라짐

 	`[anonymous]`

5. setTimeout(fly, 3000) 실행 -> 호출스택에 setTimeout 이 쌓인다.

 	`[setTimeout]`
	`[anonymous ]`

6. setTimeout 실행 끝 -> 호출스택에서 setTimeout 사라잠.

	`[anonymous]`

여기서 setTimeout 의 실행은 끝났으나 setTimeout 은 `비동기함수` 이므로
 백그라운드에 `[타이머(fly, 3000)]` 를 보내고 호출스택에서 사라진다.			

![](https://images.velog.io/images/mk928000000/post/0662b378-447b-4c0f-bdf4-b583c6b3fc6e/%EA%B5%AC%EC%A1%B02.PNG)

> `비동기함수`는 `백그라운드` 에 무언가를 보내는 역할을 한다.
> 
코드가 백그라운드에 가면 호출스택과 백그라운드 코드가 `동시에` 실행된다.

7. console.log('끝') 실행 - >호출스택에 console.log 가 쌓인다.
	이때, 백그라운드는 3초를 계속 세고 있다. `동시성`
    
    `[console.log]`
    `[ anonymous ]`
    
8. 콘솔에 '끝' 찍고 console.log 역할이 끝난다 - > 호출스택에서 사라짐
	`[ anonymous ]`
    

<br/>

9. 이제 파일이 다 끝났다. 호출 스택에서 anonymous 가 사라지고 호출스택이 비게 된다.

<br/>
<br/>

####  그러나 여전히 백그라운드에는 `타이머(fly, 3000)` 가 남아있다.

![](https://images.velog.io/images/mk928000000/post/14313242-1e97-4d4d-969a-7f94ab92fa64/%EA%B5%AC%EC%A1%B03.PNG)


10. 백그라운드에서 3초 카운트가 끝나면 `태스크 큐`로 함수가 보내진다.

	(만약 백그라운드에 여러 함수가 있다면 백그라운드에서 준비되는대로 태스크 큐에 보내진다.)

<br/>

> `호출스택`이 비어있을 때 `태스크 큐`에서 `호출스택`으로 함수를 이동시키는 일을 하는 것이 `이벤트 루프` 이다.

<br/>

11. 태스크 큐에서 호출스택으로 fly 가 이동되고 실행된다. _(이벤트루프)_
`[fly]`

![](https://images.velog.io/images/mk928000000/post/3a25f106-2919-45b3-a90f-9c65d2fa0aae/%EA%B5%AC%EC%A1%B04.PNG)


12. fly 함수 안의 console.log('3초 후 날기')  실행 -> 호출스택에 console.log 쌓임


`[console.log]`
    `[ fly ]`
    
<br/>
<br/>
13. 콘솔창에 '3초 후 날기' 출력으로 console.log 끝 -> 호출스택에서 console.log 사라짐

   `[ fly ]`
 <br/>
14. run 함수 끝 -> 호출스택에서 run 사라짐


<br/>
<br/>

#### 호출스택, 백그라운드, 태스크 큐가 모두 비었다. 비로소 자바스크립트가 완료 되었다.

<br/>

> _this, scope 등도 있지만 이는 생략하고 간단히 보았다._



***

#### 태스크 큐에서 호출스택으로 이동 순서 
태스크 큐에서 호출스택으로 이동될 때 백그라운드에서 온 순서대로가지 않고 `새치기`하는 함수들이 있다.

`promise의 then.catch`, `process 의 nextTick` 은 다른 일반함수보다 우선순위가 높아
같이 태스크큐에 있는 경우 새치기해서 호출스택으로 이동한다. 

예를 들어, 
setTimeoput 과 promise 가 백그라운드에 같이 있을 때, setTimeOut 이 먼저 끝나도 promise 가 새치기해서 먼저 호출스택으로 이동한다.

<br/>

#### 싱글스레드인 자바스크립트에서 비동기 (동시성)이 가능한 이유
`백그라운드`는 `c++` 이나 `운영체제`이다. 자바스크립트 부분이 아니다!
자바스크립트 자체는 싱글스레드이나 백그라운드는 자바스크립트가 아니기 때문에 동시성이 가능한 것이다.


