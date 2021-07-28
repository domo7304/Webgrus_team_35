const express = require("express");
const app = express();

// 필요한 미들웨어들
const cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// 라우터 경로 설정
const boardRouter = require('./routes/boardRouter');
const reservationRouter = require('./routes/reservationRouter');
const userRouter = require('./routes/userRouter');

// 미들웨어 사용 등록
app.use(express.json()); //json데이터를 주고 받기 위해 사용
app.use(express.urlencoded({ extended: true })); //배열과 같은 것들을 받아오기 위함
app.use(cookieParser());
app.use("/board", boardRouter);
app.use("/reservation", reservationRouter);
app.use("/user", userRouter);

// mongoDB 연결
const mongoURI = 'mongodb+srv://root:1234@logindb.xsreo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
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



// 아래 코드들 역할이나 로직을 알 수 있을까요?


//다른 도메인과 통신 가능하게 하는 세팅
const corsOptions = {
  origin: true,
  credentials: true
};

//node.js에서 express session을 사용하기 위한 설정
app.use(cors(corsOptions));

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

const MongoClient = mongoose.MongoClient;
const databaseName = "task-manager";

const interval = 3000;  //reload 시간간격.

app.listen(8080, () => {
  console.log("listening...");
  console.log(`Server Listening on 8080`)  // 서버 실행.
  setInterval(() => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        return console.log("Unable to connect to database.");
      }
      console.log("Connected correctly.");
      // db가 없으면 생성. 있으면 조회
      const db = client.db(databaseName);
      // 해당 db에 collection가 없으면 생성(있으면 조회) 후 document 하나 저장
      var currentTime = getCurrentDate(); //원하는 시간을 인자로.
      console.log("3초간격 실시간 서버 구동중입니다");
      console.log(currentTime);
       db.collection("seats").updateMany(
         {"endTime" : {$lte: currentTime}},  //현재시간이 예약된완료시간을 초과햇을시 (만료시간<현재시간)
         {$set:{
           isAvailable:true,  // 사용자는 그 자리는 더이상 이용할수있으므로 좌석상태를 이용가능하게 바꿉니다.
           userId:"",
           endTime:""  
           /*디폴트를 string형으로. 추가할때 여기를 다시 Date형으로바꾼다. (유연하게)
             몽고DB의 특성으로 다시 예약으로 추가할때는 여기가 Date형으로 추가해서 시간계산에 포함이 되도록 할것임.
             
             핵심:string형일경우 시간계산에선 제외될테니까 빈좌석일때는 시간계산이 안될것?이다. 
            */  
        }})          

  })
  }, interval);
});