# var, const, let

>
* ES2015 부터 var 는 const 와 let 이 대체한다
* var 와 const/let 의 가장 큰 차이점 :
	- var : 함수스코프 존중
	- const, let : 블록스코프 존중


<br/>

## 1. var 와 const, let 의 차이

```
<script>
/**
* var 사용 예시
*  정의된 블록 바깥에서도 var x의 사용이 가능하다. 
*  그러나 얘도 함수로 감싸여 정의되면 함수 바깥에서는 사용할 수 없다.
**/
  if (true){
      var x = 3;
  }
  console.log(x);  //3 
 
  function a(){
      var y = 3;
  }
  console.log(y) ; //Uncaught ReferenceError : y is no defined 
  
  
  /**
  * const 사용 예시
  *  정의된 블록 바깥에서는 const y, let z 의 사용이 불가하다. 
  *  
  **/
  if(true){
      const y = 3;
      let z = 4;
  }
 console.log(y); // Uncaught ReferenceError : y is no defined  
 console.log(z); // Uncaught ReferenceError : y is no defined 
</script>

```


## 2. let 과 const 의 사용


> `const` 에는 = 을 단 한번만 사용할 수 있다.

```
<script>
	const a = 3;
	a = 5; // error 
</script>
```

>
그러나 `객체`가 `const` 로 정의될 경우는 조금 다르다.
`변수명` b 에 = 을 단 한번만 붙일 수 있다고 생각하면 된다.

```
<script>
  const b = {name: 'zerocho'};
  b = {job : 'engineer'}; // error! b 에는 더이상 = 을 사용할 수 없다.
  b.name = 'nerocho';   // 객체의 변수는 값 변경이 가능하다. 


/*
 *
 * 만약 변수 선언만 하고 값을 나중에 넣고 싶다면 const 가 아닌 let 을 쓴다.
 */
 
  const c;
  c= ~~ ; //대입 불가! 이런식으로 쓰고싶다면 let 을 쓴다.

  let c = 5;
  c = 3; 
  c = 10;
</script>
```

> 생각보다 const 사용할일이 많다.
`기본적으로 const 로 선언`하고, 혹시 나중에 값을 바꿀일이 있으면 그때 const 를 let 으로 바꾸는것을 추천한다. 값이 바뀌는 불상사를 막을 수 있기 때문이다.





<br/>

***
<br/>

# 템플릿 문자열

## 1. 템플릿 문자열의 사용
> `백틱 문자열` 이라고도 한다.
기존의 자바스크립트에서 `+ 부호`를 사용해 열심히 문자를 엮었다면, `템플릿문자열`은 부호를 사용하지 않고 문자열에 변수를 대입할 수 있게 해준다.

```
<script>
/*
 *
 * 기존 자바스크립트에서의 사용 방식. 
 * + 부호로 한땀한땀 엮고 띄어쓰기에 주의하고있다.
 */
  var won  = 1000;
  var result = '이 과자는 '+ won+'입니다';


 /*
  *
  * 탬플릿 문자열. 백틱문자열 이라고도 한다.
  * ` ` 백틱 사용과 ${변수명} 으로 바로 변수가 대입된 문자열이 출력된다.
  */
  const result = `이 과자는 ${won}원입니다`;   
  
</script>
```

<br/>

## 2. 백틱 부호에는 함수 호출 기능도 있다.
> tagged template reteral 이라고 한다.
기존의 `함수명()` 방식 외에 `함수명`` ` 으로도 해당 함수를 호출할 수 있다.

```
<script>
  function a(){}
  a(); //a 함수가 호출된다
  a``; //a 함수가 호출된다. 
</script>
```
