const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");

const bodyParser = require("body-parser");

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

function getCurrentDate(hour=0){  //원하는시간을 투입한다. 일단 여기서 디폴트는 0으로설정.
  var date = new Date();
  var year = date.getFullYear(); 
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours()+hour;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use("/booking", require("./routes/bookingRouter"));

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
