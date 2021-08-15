const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const temp = require('./routes/bookingRouter');
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


// 라우터 경로 설정
const boardRouter = require('./routes/boardRouter');
bookingRouter = temp.router;
const userRouter = require('./routes/userRouter');

// 미들웨어 사용 등록
app.use(express.json()); //json데이터를 주고 받기 위해 사용
app.use(express.urlencoded({ extended: true })); //배열과 같은 것들을 받아오기 위함
app.use(cookieParser());
app.use("/api/board", boardRouter);
app.use("/api/book", bookingRouter); //여기 /api/book으로
app.use("/api/user", userRouter); 

// mongoDB 연결
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('mongoDB connected!'))
.catch(err => console.log(err));

//서버 가동
const PORT = 5000;
app.listen(PORT, () =>{
  console.log(`server listening on port ${PORT}!`);
})

// const connectionURL = "mongodb+srv://root:1234@logindb.xsreo.mongodb.net/webDB?retryWrites=true&w=majority";
// const databaseName = "webDB";
// function getCurrentDate(hour=0){ 
//   var date = new Date();
//   var year = date.getFullYear(); 
//   var month = date.getMonth();
//   var today = date.getDate();
//   var hours = date.getHours()+hour;
//   var minutes = date.getMinutes();  
//   var seconds = date.getSeconds();
//   var milliseconds = date.getMilliseconds();
//   return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
// }
// async function changeValue(dbasename,collectionname,seatNum){
//   try{
//   await MongoClient.connect(connectionURL,{ useNewUrlParser: true ,useUnifiedTopology: true},(err,client)=>{
//     if (err) {
//             return console.log("Unable to connect to database.");
//           }
//        console.log("Connected correctly.");
//        let db = client.db(dbasename);
//         let collection = db.collection(collectionname);
//         collection.updateOne(
//           {"seatNo" : seatNum},  
//           {$set:{
//             isAvailable:true,  
//             userId:"",
//             endTime:""  
//          }});
//          console.log("업데이트를 완료햇습니다.");
//   })}
//   catch(err){console.log(err);}
// };
// const interval = 20000;  
// app.listen(5000, () => {
//   console.log("listening...");
//   console.log(`Server Listening on 5000`)
//   var user_list=[];  
//   MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
    
//     //운영중 서버가 내려갈것을 대비해 서버를 구동시, 이용중인 사용자의 리스트를 가져옵니다.
//         if (err) {
//           return console.log("Unable to connect to database.");
//         }
//         console.log("Connected correctly.");
//         const db = client.db(databaseName);  
//          db.collection("seats").find({"isAvailable" : false}).toArray(function (err, docs) {      
//           if (err) {
//             return console.log("이용중인 사용자의 정보를 가져올수 없습니다.");
//           }
//           for(var i=0;i<docs.length;i++){
//             var li ={
//               seatNo:docs[i].seatNo,
//               endTime:docs[i].endTime
//             }
//             user_list.push(li);
//           }
//           console.log("기존 이용자 출력");
//           console.log(user_list);
//     })})

//     setInterval(  () => { //async키워드 여기에
//     /* 
//       이제 서버 구동이후에, 예약한사람들의 데이터를 가져옵니다.
//     */
//     const foo = require('./routes/bookingRouter');  
//     const elem = foo.timer
//     for(var i=0;i<elem.length;i++){
//         var index=false;
//         for(var x=0;x<user_list.length;x++){
//           if(user_list[x].seatNo==elem[i].seatNo) {index=true;}
//         }
//         if(index==true)
//           continue;
//         else{
//           user_list.push(elem[i]);
//         }
//     }
//     console.log(user_list);
//       for(var i=0;i<user_list.length;i++){
//        if(user_list[i].endTime<=getCurrentDate()){
         
//         var seatNum = user_list[i].seatNo;
//       //     await MongoClient.connect(connectionURL, { useNewUrlParser: true }, async (err, client) => { //await 키워드 여기에.
//       //     if (err) {
//       //       return console.log("Unable to connect to database.");
//       //     }
//       //     console.log("Connected correctly.");
//       //     const db = client.db(databaseName);  
//       //     await changeValue();
//       //     console.log("예약시간이 만료되어 업데이트했습니다.");
//       // })
//       changeValue(databaseName,"seats",seatNum);
//       user_list.splice(i,1);
//       i--;
//       for(var x =0;x<foo.timer.length;x++){
//         if(foo.timer[x].seatNo==seatNum)
//             foo.timer.splice(x,1);
//       }  
//       }
//         else{console.log("......삭제 대상은 아닙니다.......")}
//     }
//   }, interval);
// });