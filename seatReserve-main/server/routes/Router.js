
const express = require('express');
const router = express.Router();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

function getCurrentDate(hour){  //원하는시간을 투입한다. 일단 여기서 디폴트는 0으로설정.
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


/* 함수사용할때 저렇게 지금 내버전에서는 인자로 넣어서 콜백함수를 사용하자. */
router.get('/showSeats', (req, res) => {
    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
        if (err) {
          return console.log("Unable to connect to database.");
        }
        console.log("Connected correctly.");
        // db가 없으면 생성. 있으면 조회
        const db = client.db(databaseName);
        // 해당 db에 collection가 없으면 생성(있으면 조회) 후 document 하나 저장
         db.collection("seats").find().toArray(function (err, docs) {
            if(err) return res.json({success:false})
            return res.json({success:true,docs})
         });
    })
})
router.post('/reserve', (req, res) => {
  MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        return console.log("Unable to connect to database.");
      }
      console.log("Connected correctly.");
      const db = client.db(databaseName);   // db가 없으면 생성. 있으면 조회
     db.collection("seats").replaceOne(
       {seatNo:req.body.seatNo}, //seatNo를 String형으로 바꾸어서 진행햇더니 성공햇다.
       {
          seatNo:req.body.seatNo, 
          isAvailable:false,
          userId:req.body.userId,
          endTime:getCurrentDate(req.body.addTime)
       }
     )
     
})
})


module.exports = router;