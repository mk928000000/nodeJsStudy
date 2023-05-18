## express 를 이용해서 코딩을 할 것.

0. 작업 폴더를 연 후 터미널 오픈.
1. new terminal
2. npm init 로 셋팅

- package.json 이 생성됨 : 무슨 라이브러리를 썼는지 기록
- entry point 에만 server.js 파일명을 정해주고 나머지는 엔터만 잘 쳐줌

3. npm install express

- package.json 의 dependencies 에 설치된 express library 와 버전이 표시됨.
- 설치가 된 순간 node_modules 라는 폴더가 생김. 설치된 library 가 들어가 있음.

* mac 의 경우 권한이 없다며 에러가 나기도 함. 그럴경우 yarn 을 설치해서 yarn add express 로 설치.

4. server.js 파일을 만듬

- entry point 에서 main 을 server.js 로 하겠다고 설정했으므로 server.js로 파일명을 정함.

## npm install -g nodemon 설치 (yarn add global nodemon)

- 저장 발생 시 자동으로 서버를 껐다 켜준다.
- 기존 node server.js > nodemon server.js 로 실행
- 윈도우 보안오류가 뜨기도 한다.

  > CategoryInfo : 보안 오류: (:) [], PSSecurityException
  > FullyQualifiedErrorId : UnauthorizedAccess

- 윈도우 보안오류가 발생할 경우,
  (1) powershell 을 관리자 권한으로 실행
  (2) > executionpolicy
  (3) Restricted 가 확인된다.
  (4) > set-executionpolicy unrestricted
  (5) 다시 nodemon server.js 실행

## 있어보이게 bootstrap 설치

1. 구글 bootstrap 첫 사이트 입장 https://getbootstrap.com/docs/5.0/getting-started/introduction/
2. version 5.0
3. 중간의 starter template 복사
4. index.html 을 갈아엎기 (전체붙여넣기)
5. <html lang='en'> 에서 lang='en' 지우기
6. Search Docs.. 에 검색해서 컴포넌트를 복붙한다

## FORM 으로 서버와 연결할 수 있는 방법

1. GET
2. POST ( 관습적으로 POST 로 많이 씀)
3. PUT
4. DELETE

## body-parser 라이브러리 사용

- POST 로 보낸 정보를 req 에서 꺼내쓰기

1. server.js 에 추가
   body parser 라이브러리가 express 에 포함되어있다. 사용하도록 한줄 추가.
   app.use(express.urlencoded({extended:true }));

2. input 태그에 name 넣기
3. server.js 에 app.post 만들기

## RESTFUL API

1. API란 ? 통신 규약. 웹 개발 시 API 는 ? = 웹서버와 고객간의 소통방식. 통신 규약.
   server.js 의 /write, /add 등등이 api 이다.
2. rest api 란 ? 어떤 식으로 api 를 만들지에 대한 답. 보기쉽고 관리가 쉽다.
   ROY Fielding : HTTP 요청 시스템 (GET, POST, PUT, DELETE) 는 REST 원칙에 의해 쓰면 아름답겠다 ! -> 요즘 정론이 됨.
3. REST 원칙 6개
   (1) Uniform interface : 하나의 자료는 하나의 URL. URL 로 예측 가능해야함. \*\*\*\*이거만 중요함\*\*\*\*
   (2) Client-Server : 역할을 구분하라. 브라우저는 요청만, 서버는 응답만.
   (3) Stateless : 각 요청은 단독으로. 의존이 없어야함.
   (4) Cacheable : 캐싱가능 (신경 x . 크롬이 알아서 함)
   (5) Layered Ssytem : 신경x
   (6) Code on Demand : 신경x

4. 좋은 REST API 예시
   (1) xxx.xxxx.com/products/55432 >> 대충 예상이 된다. 55432 번호 상품을 보여줄것 같다.
   (2) 이름짓기 원칙
   - URL 명사 사용
   - 하위문서를 나타낼땐 / 사용
   - 파일확장자 .html 쓰지 말기
   - 띄어쓰기는 대시 (-) 이용

## 몽고db 사용

1. 무료 호스팅을 받아 쓰자 mongodb atlas!
2. npm install mongodb@3.6.4 설치
3. server.js 에 mongodb 연결문 추가 + connect url 붙이기
4. 연결 확인
5. 테이블 만들기 ( database, collection) > todoApp , post
6. 연결문에 db 연결, 몽고db 문법으로 데이터 넣어보기

## npm install ejs (대체품 : vue, react ..)

EJS 라이브러리로 서버에서 데이터를 쉽게 가져온다.
\*\* 요새는 npm 설치 후 --save --save dev 이런거 안해도 됨.

1. server.js 에 추가
   app.set('view engine', 'ejs');
2. 이제 웹 페이즈를 만들때 .html 뿐 아니라 .ejs 라고 쓸 수 있다. .html 과 동일하나, html 안에 서버 데이터를 넣어줄 수 있다.
3. 데이터 집어넣는 방식 : <%= 변수이름 %>
4. ejs 파일 get 방법
   app.get("/list", function(req, res){
   // ejs 파일 불러오는것은 방식이 조금 다르다
   res.render("list.ejs");
   });
5. 멋진 에러 발생
   Error: Failed to lookup view "list.ejs" in views directory "C:\Dev\node_mongo\views"
   ### ejs 파일은 views 폴더 하위에 있어야 하기 때문
   ### views 폴더를 만들고 list.ejs 를 하위로 옮겨준다
   /views/list.ejs
6. 새로고침 후 화면 확인

## ejs 문법

.ejs 파일에서 자바스크립트 문법을 사용할 수 있다.
아래처럼 <% %> 안에 스크립트를 쓰면 html 태그와 함께 쓸 수 있다.
<% for(var i=1; i < posts.length; i++) { %>

<h4>할일 제목 : <%=posts[i].제목 %></h4>
<p>할일 기한 : <%=posts[i].날짜 %></p>
<%} %>

## 글번호달기

1. 보통 db 에 항목을 추가할때마다 자동으로 총 게시물 개수 +1 을 한다. (auto increment)
2. 그러나 게시글을 대상으로 하면 게시글이 삭제될 때 번호가 중복될 수 있다.
3. 번호 카운트를 위한 별도의 collection 을 만든다!

## 몽고db 문법

1. select
   find / findOne / findMany
   db.collection("콜렉션명").find().toArray(function(err,result{}));

2. insert
   insertOne / insertMany
   db.collection("콜렉션명").insertOne({넣을대상},function(err,result){});

3. update
   update Operator 를 사용한다.

   1. $set : 바꿔주세요 오퍼레이터
   2. $inc : 증가시켜주세요 오퍼레이터

   updateOne / updateMany
   db.collection("콜렉션명").updateOne({바꿀대상},{오퍼레이터:{어떻게 바꿀지}},function(err, result){});

4.

## DELETE 요청하는 법

URL 은 DELETE 로 만들어야하는데, method = "GET/POST" 밖에 입력이 안된다.

1. method-override 라이브러리를 이용 (node 사용가능)
2. Javascript Ajax 이용 (언젠간 쓸거니까 이걸 쓰자)

## ajax는 뭘까

1. 새로고침 없이
   서버에 요청하는걸 도와주는 js 문법
2. jquery 문법을 사용한다.
   <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

3. 기본 ajax 문법
   $.ajax({
   method: 'DELETE',
   url: '요청경로',
   data: '요청과 함께 보낼데이터'
   }).done(function(result){
   서버에서 응답.status(200) 으로 상태코드 설정시 성공으로 인식한다.
   성공시 할 일
   }).fail (function(xhr, errStatus, errorThrown){
   //errStatus : 에러코드
   //errorThrown : 에러메세지
   서버에서 응답.status(400) 으로 상태코드 설정시 성공으로 인식한다.
   실패시 할 일
   });

## 클릭한 번호의 인자값 가져오기

1. data-id = "값" 을 button 태그에 넣는다.
   <button data-id="<%=posts[i]._id %>" class="btn btn-danger delete">삭제</button>

2. 클릭한 값에서 data-id 값 가져오기.
   $('.delete').click(function(e){
   var 글번호 = e.target.dataset.id;
   }

## 게시물마다 상세페이지 만들기

1. /detail로 접속하면 detail.ejs 보여줌
2. /detail/:id = /detail/입력값 을 입력하면 파라미터로 입력값을 받음

   app.get("/detail/:id", function (req, res) {
   // /details/뒤에 입력값 : req.params.id
   });

## css 파일넣기

1. 변하지 않는파일 (static files)
2. statisc files -> public/main.css
3. server.js 에 사용할 폴더를 추가한다.
   app.use('/public',express.static('public'));

## 조립식 html

1. jquery 없이는 사용하지 못한다.
2. ejs 에서만 가능한 조립식 문법을 사용하자.
   <%- include('nav.html') %>

## npm install method-override

form 태그에서 method 에 delete/put 도 쓸수있게 하자.

1. npm install method-override 설치
2. server.js 에 아래내용 추가
   const methodOverride = require('method-override')
   app.use(methodOverride('\_method'))
3. FORM 에서 PUT 요청 해보기
   form 태그의 method 는 GET/POST 만 가능하지만 action 에 아래처럼 써주는 걸로 put 요청이 가능하다.
   /경로?\_method=PUT
   <form action="/edit?_method=PUT" method="POST">
