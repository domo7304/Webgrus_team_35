const express = require('express');
const router = express.Router();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb+srv://root:1234@logindb.xsreo.mongodb.net/webDB?retryWrites=true&w=majority";
const databaseName = "webDB";
var timer =[];

//원하는시간을 투입한다. 일단 여기서 디폴트는 0으로설정.
function getCurrentDate(hour=0){ 
  var date = new Date();
  var year = date.getFullYear(); 
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours()+hour;
  var minutes = date.getMinutes();  //일단 분으로 해서 테스트해보자.
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}


/* 함수사용할때 저렇게 지금 내버전에서는 인자로 넣어서 콜백함수를 사용하자. */
router.get('/showSeats', (req, res) => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
        if (err) {
          return console.log("Unable to connect to database 연결불가합니다..");
        }
        console.log("Connected correctly.");
        const db = client.db(databaseName);
         db.collection("seats").find().toArray(function (err, docs) {
            var li1=[]
            for(var i=0;i<=9;i++){
              li1.push(docs[i])
            }
            var li2=[]
            for(var i=10;i<=19;i++){
              li2.push(docs[i])
            }
            var li3=[]
            for(var i=20;i<=29;i++){
              li3.push(docs[i])
            }
            if(err) return res.json({success:false})
            return res.json({success:true,li1,li2,li3})
         })        
    })
})

router.post('/booking', (req, res) => {
  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        return console.log("Unable to connect to database.");
      }
      console.log("Connected correctly.");
      const db = client.db(databaseName);   // db가 없으면 생성. 있으면 조회
      var addTime=parseInt(req.body.addTime)
      var seatNoNum = parseInt(req.body.seatNoNum)
     db.collection("seats").replaceOne(
       {seatNo:req.body.seatNo}, 
       {
          seatNo:req.body.seatNo, 
          seatNoNum : seatNoNum,
          isAvailable:false,
          userId:req.body.userId,
          endTime:getCurrentDate(addTime)
       }
     )
     var ele = {  //추가된 부분 
       seatNo:req.body.seatNo,
       endTime:getCurrentDate(addTime)
     }
     timer.push(ele);
     return res.json({success:true})
})
})

module.exports = {
  router:router,
  timer:timer
}
