// const mongoose = require("mongoose");

// module.exports = () => {
//   const connect = () => {
//     if (process.env.NODE_ENV !== "production") {
//       mongoose.set("debug", true);
//     }
//     mongoose.connect(
//       'mongodb+srv://root:1234@logindb.xsreo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//       //최종적으로 사용할 데이터베이스의 주소로 교체해주면 된다.
//       {
//         dbName: "webDB"
//       },
//       error => {
//         if (error) {
//           console.log("MongoDB connection error", error);
//         } else {
//           console.log("MongoDB connection success");
//         }
//       }
//     );
//   };
//   connect();
//   mongoose.connection.on("error", error => {
//     console.log("mongoDB connection error", error);
//   });
//   mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB connection is closed, retrying...");
//     connect();
//   });
//   require("./user");
//   require("./board");
// };

/*
  - 도원 - 
  
  현재 server.js 24 ~ 31번 라인이 db연결부인데, 
  이 파일 index.js에서 1 ~ 22번 라인까지는 기능을 옮긴 상태입니다 (env/prod 모드는 config폴더로 옮겼고, db 이름은 webDB로 설정 해주었습니다)
  22번 라인 밑으로 connect부터 마지막까지의 코드가 어떤 역할로 쓰인 것인지 제가 잘 알지 못해서 그냥 둔 상태이고,
  필요한 기능을 server.js db연결부 밑으로 작성해주시면 될 거 같습니다
*/