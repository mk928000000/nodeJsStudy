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
