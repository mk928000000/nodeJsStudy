/*
 *node.js 에서 서버를 만들기 위한 기본 문법 세줄
 * // 아까 설치한 라이브러리를 첨부
 * // 첨부한 라이브러리로 객체 만듬
 * // 58080포트에 서버를 어디에다 열겠다.
 *
 */

const express = require("express");
const app = express();
//body parser 라이브러리가 express 에 포함되어있다. 사용하도록 한줄 추가.
app.use(express.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient; // 몽고db library 필요
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); // ejs 라이브러리 추가
app.use("/public", express.static("public")); // css 폴더 (public ) 를 쓸거다 라고 명시.

var db;
MongoClient.connect(
  "mongodb+srv://nodeMongo:nodeMongo@cluster0.ezcucwb.mongodb.net/?retryWrites=true&w=majority",
  function (err, client) {
    //연결되면 할 일.
    // connection err 일 경우
    if (err) return console.log(err);

    // todoApp database 연결
    db = client.db("todoApp");
    // post collection 에 데이터 임시로 추가해봄
    // db.collection("post").insertOne(
    //   { 이름: "John", 나이: 20 },
    //   function (err, result) {
    //     console.log("저장완료");
    //   }
    // );
    // 데이터 컬럼 중 _id 는 설정을 안하면 알아서 부여됨.

    //에러 없으면 서버 연결!
    app.listen(58080, function () {
      console.log("listening on 58080");
    });
  }
);

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
  //res.sendFile(__dirname + "/index.html");
  res.render("index.ejs");
});
app.get("/write", function (req, res) {
  //res.sendFile(__dirname + "/write.html");
  res.render("write.ejs");
});
app.get("/list", function (req, res) {
  // DB에 저장된 POST 이름의 collection 안의 모든 데이터를 꺼낸다
  db.collection("post")
    .find()
    .toArray(function (err, result) {
      // ejs 파일 불러오는것은 방식이 조금 다르다
      // ejs 파일을 불러오면서 db에서 가져온 result 를 posts 라는 이름으로 보낸다
      res.render("list.ejs", { posts: result });
    });
});

/*
 * 함수 안에 함수 (function(){}) = 콜백함수
 * 순차적으로 실행하고 싶을때 쓴다
 * 신문법으로 화살표 함수도 사용 가능.
 * () => {}
 *
 */

// /add 경로로 POST 요청을 하면 아래 코드를 실행
// 보낸 정보는 req 안에 있다. (꺼내 쓰려면 라이브러리 필요 body-parser)
app.post("/add", function (req, res) {
  res.send("전송완료");
  //글번호달기
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (err, result) {
      console.log(result.totalPost);
      var count = result.totalPost;

      //DB 에 저장하라 (Rest API 개념 알기)
      db.collection("post").insertOne(
        {
          _id: count,
          제목: req.body.title,
          날짜: req.body.date,
          내용: req.body.content,
        },
        function (err, result) {
          console.log("저장완료");

          //counter 의 총게시물갯수를 +1 해야함.
          db.collection("counter").updateOne(
            { name: "게시물갯수" },
            { $inc: { totalPost: 1 } },
            function (err, result) {
              if (err) return console.log(err);
            }
          );
        }
      );
    }
  );
});

app.get("/edit/:id", function (req, res) {
  req.params.id = parseInt(req.params.id);
  db.collection("post").findOne({ _id: req.params.id }, function (err, result) {
    console.log(result);
    res.render("edit.ejs", { post: result });
  });
});

app.put("/edit", function (req, res) {
  req.body.id = parseInt(req.body.id);
  db.collection("post").updateOne(
    { _id: req.body.id },
    {
      $set: {
        제목: req.body.title,
        날짜: req.body.date,
        내용: req.body.content,
      },
    },
    function (err, result) {
      console.log("수정완료");
      res.redirect("/list");
    }
  );
});

// delete 요청이 올때 !
app.delete("/delete", function (req, res) {
  console.log(req.body);
  //자바스크립트가 임의로 문자열로 바꿔버렸다. _id 는 자료형이 숫자이므로 바꿔준다.
  req.body._id = parseInt(req.body._id);

  //db에서 게시물 번호의 게시물을 찾아서 삭제
  db.collection("post").deleteOne(req.body, function (err, result) {
    console.log("삭제완료");
    res.status(200).send({ message: "성공했습니다." }); // 요청 성공 했으니 응답코드로 200을 보내주세요.
    //console.log("삭제실패");
    //res.status(400).send({ message: "실패했습니다." }); // 요청 실패했습니다.
  });
});

// /detail로 접속하면 detail.ejs 보여줌
app.get("/detail/:id", function (req, res) {
  req.params.id = parseInt(req.params.id);
  db.collection("post").findOne({ _id: req.params.id }, function (err, result) {
    res.render("detail.ejs", { post: result });
  });
});
