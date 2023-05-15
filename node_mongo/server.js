/*
 *node.js 에서 서버를 만들기 위한 기본 문법 세줄
 *
 */

// 아까 설치한 라이브러리를 첨부
const express = require("express");
// 첨부한 라이브러리로 객체 만듬
const app = express();
// 58080포트에 서버를 어디에다 열겠다.
app.listen(58080, function () {
  // 터미널에 node server.js 를 치면 아래 콘솔문이 뜬다. 확인 후 웹창에 localhost:58080 을 검색하면 서버 화면이 열린다.
  console.log("listening on 58080");
});

// /pet 으로 방문을 하면, pet관련된 안내문을 띄워보자.
//app.get("경로", function (요청, 응답) {
app.get("/pet", function (req, res) {
  res.send("반갑습니다. pet용품 쇼핑 사이트 입니다.");
});

// 터미널에서 ctrl+c  : 서버 종료.
// 서버를 다시 띄우면 http://localhost:58080/pet 경로로 사이트 확인이 된다.

app.get("/beauty", function (req, res) {
  res.send("반갑습니다. beauty용품 쇼핑 사이트 입니다.");
});

// 경로 실행 시 html 파일을 보내보자
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});
