# 기본 자바스크립트 문법

<br/>

## 1. 호출스택

호출 스택을 그려 아래 함수의 순서를 추론해 보자.

```
<script>
  function first(){
      second();
      console.log('첫번째');

  }

  function second(){
      third();
      console.log('두번째')

  }

  function third(){
      console.log('세번째');
  }

  first();
</script>
```

> 결과 ==> 세번째-> 두번째 -> 첫번째


<br/>
<br/>
<br/>

## 2. 스택은?
> 밑에서부터 쌓이고, 위에서부터 실행.


```
third()     | 4. second 안에서 third 실행해서 third 쌓임
second()    | 3. first 안에서 second 실행해서 second 쌓임
first()     | 2. first 를 처음 실행해서 쌓임
anonymous   | 1. 파일이 실행될때 쌓임. (크롬단어)
```
<br/>
<br/>

_{ }를 벗어나는 순간 호출 스택에서 나간다고 생각하면 된다._
<br/>

```
third()    | 1. third 실행 후 스택에서 사라짐
second()   | 2. second 실행 후 스택에서 사라짐
first()    | 3. first 실행 후 스택에서 사라짐
anonymous  | 4. 파일이 끝나면 사라짐. 
```

anonymous 까지 사라지면 자바스크립트의 모든 실행이 완료된다.

> _만약 first 가 실행완료된 후 second 가 실행되었다면,_
호출 스택에는 anonymous 위에 first 가 쌓이지 않고 쌓였다가 다시 사라진 후 second 가 쌓일 것이다.


<br/>
<br/>

## 3. 자바스크립트는 항상 위에서 아래로, 왼쪽에서 오른쪽으로 실행된다.
그러나 `비동기 코드`가 되었을 때, 예를 들어 `setTimeout`

```
<script>
  function run(){
      console.log('3초 후 실행')

  }

  console.log('시작');
  setTimeout(run, 3000);
  console.log('끝');
</script>
```
<br/>


호출 스택으로 분석해보자.

1. 파일이 실행되는 순간 호출 스택에 anonymous 가 하나 깔린다.
2. 메모리 어딘가에 function run 이 쌓인다.
3. console.log ('시작') 이 실행되고
4. setTimeout 이 실행되고
5. console.log('끝') 이 실행된다.
6. _끝 ??_

>
아직 3초가 지나지 않았지만 파일 실행이 완료되면 자바스크립트가 끝날 것인데
_그럼 setTimeout 의 `run` 이 실행될 공간이 없다. _
>
setTimeout 이 `비동기` 이기 때문에 호출스택 만으로는 설명할 수 없고,
이를 위해 `이벤트 루프`가 등장한다.
