const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const temp = require('./routes/bookingRouter');

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
});