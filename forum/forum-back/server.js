const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");

connect();

const corsOptions = {
  origin: true,
  credentials: true
};
//다른 도메인과 통신 가능하게 하는 세팅

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "webgrus35",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
//node.js에서 express session을 사용하기 위한 설정
app.use(cors(corsOptions));

app.use(express.json());//json데이터를 주고 받기 위해 사용
app.use(express.urlencoded({ extended: true }));//배열과 같은 것들을 받아오기 위함

app.use("/member", require("./routes/memberRouter"));//require과 같은 라우터를 사용하기 위한 url은 /member이다.
app.use("/board", require("./routes/boardRouter"));//바로 위 코드와 같은 양식

app.listen(8080, () => {
  console.log("listening...");
});
