const express = require("express");
const app = express();

const cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');

// 라우터 경로 설정
const boardRouter = require('./routes/boardRouter');
const bookingRouter = require('./routes/bookingRouter');
const userRouter = require('./routes/userRouter');

// 미들웨어 사용 등록
app.use(express.json()); //json데이터를 주고 받기 위해 사용
app.use(express.urlencoded({ extended: true })); //배열과 같은 것들을 받아오기 위함
app.use(cookieParser());
app.use("/board", boardRouter);
app.use("/booking", bookingRouter);
app.use("/user", userRouter);

// mongoDB 연결
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('mongoDB connected!'))
.catch(err => console.log(err));

// 서버 가동
const PORT = 3000;
app.listen(PORT, () =>{
  console.log(`server listening on port ${PORT}!`);
})

// //다른 도메인과 통신 가능하게 하는 세팅
// const corsOptions = {
//   origin: true,
//   credentials: true
// };

// //node.js에서 express session을 사용하기 위한 설정
// app.use(cors(corsOptions));

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: "webgrus35",
//     cookie: {
//       httpOnly: true,
//       secure: false
//     }
//   })
// );

// const MongoClient = mongoose.MongoClient;
// const databaseName = "task-manager";

// const interval = 3000;  //reload 시간간격.

// app.listen(8080, () => {
//   console.log("listening...");
//   console.log(`Server Listening on 8080`)  // 서버 실행.
//   setInterval(() => {
//     MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
//       if (err) {
//         return console.log("Unable to connect to database.");
//       }
//       console.log("Connected correctly.");
//       // db가 없으면 생성. 있으면 조회
//       const db = client.db(databaseName);
//       // 해당 db에 collection가 없으면 생성(있으면 조회) 후 document 하나 저장
//       var currentTime = getCurrentDate(); //원하는 시간을 인자로.
//       console.log("3초간격 실시간 서버 구동중입니다");
//       console.log(currentTime);
//        db.collection("seats").updateMany(
//          {"endTime" : {$lte: currentTime}},  //현재시간이 예약된완료시간을 초과햇을시 (만료시간<현재시간)
//          {$set:{
//            isAvailable:true,  // 사용자는 그 자리는 더이상 이용할수있으므로 좌석상태를 이용가능하게 바꿉니다.
//            userId:"",
//            endTime:""  
//            /*디폴트를 string형으로. 추가할때 여기를 다시 Date형으로바꾼다. (유연하게)
//              몽고DB의 특성으로 다시 예약으로 추가할때는 여기가 Date형으로 추가해서 시간계산에 포함이 되도록 할것임.
             
//              핵심:string형일경우 시간계산에선 제외될테니까 빈좌석일때는 시간계산이 안될것?이다. 
//             */  
//         }})          

//   })
//   }, interval);
// });

/*
  - 도원 -

  변경사항
  1.server 39번 라인 이후로 주석처리 해놓았습니다. 
    1)Cors, express-session 기능을 일단 지금 단계에서는 사용되지 않아서 주석처리 하였고
    2)65 ~ 91 라인은 몽고db를 한 계정으로 통합 한 것이 제대로 작동되나 확인하기 위해 임시로 주석처리 해놓았습니다. 
      다시 작업하실 때 주석 풀고 하시면 될 것 같습니다.

  2.models/index.js 가 원래 mongoDB 연결부였는데, 이를 간단하게 server.js 로 옮기고 
    종혁님께서 작성하셨던 dev / prod 모드에 관한 것은 config 폴더 안으로 집어넣어서 mongoose.connect 부분은 최대한 간결하게 남겨보았습니다.
    하지만 완벽하게 옮긴 것이 아니라 models/index.js 하단 주석 한 번 더 확인해주시면 감사할 것 같습니다.

  3.서버 가동 및 db연결 정상적으로 확인하였습니다. 
    npm start 후 postman 이용해서 register, login, logout 정상적으로 작동하는 것 확인하였습니다.
    board에 write 기능도 확인해보았는데, 몽고db에 저장한 user ObjectId를 대입하여 postman으로 req를 보내어도
    Board validation failed: writer: Path `writer` is required. 이러한 오류가 발생하며 success: false 가 반환되어 제대로 확인하지는 못하였습니다.
    하지만 위의 오류와 false 가 제대로 반환되는 거 보니 종혁님 코드 자체는 정상적으로 동작되는 것 같습니다.
  
  4.주석 처리한 CORS 옵션은 공부 후 적절히 프론트 요청 받을 수 있게 수정해보겠습니다.

  그리고 종혁님께서 테스트겸 로그인부 구현하실 때 session 방식으로 사용자 인가를 구현하신 것 같은데,
  제가 인가 방식을 전부 jwt token방식으로 적어놓아서 혹시 불편함이 없으시다면 위의 코드에서 session 관련 코드 삭제하고
  token 방식으로 사용자 인가 계속 구현해도 괜찮을지 의견 여쭈어봅니다, 
  뭔가 session 방식으로 사용자 인가 요청을 한 코드가 있어서 충돌이 있을 수 있거나, session으로 구현하는 게 더 선호되시면 꼭 말씀해주시기 바랍니다!
*/