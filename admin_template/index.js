const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const homeRoutes = require('./routes/home-routes');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const fs = require('fs');

const ejs = require('ejs');
const { fstat } = require('fs');

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');//설정 이름을 값에 할당. 특정 이름을 사용해 서버의동작을 구성 가능


app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));//파일명 제외 public의 절대경로로 프론트 argon 디자인 폼을 사용
app.use(homeRoutes.routes);

app.use(express.json()); //json데이터를 주고 받기 위해 사용
app.use(express.urlencoded({ extended: true })); //배열과 같은 것들을 받아오기 위함

app.use("/user", userRouter);

// //여기서부터 새로 작성한 코드입니다.
// app.get('/', function(req, res) {
//   let name = "Korean";
//   res.render('home.ejs',{ userName : name, a:1029})
// });

// mongoDB 연결
const mongoURI = 'mongodb+srv://root:1234@logindb.xsreo.mongodb.net/webDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('mongoDB connected!'))
.catch(err => console.log(err));


const PORT = 3000;
app.listen(PORT, () =>{
  console.log(`server listening on port ${PORT}!`);
})