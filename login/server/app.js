"use strict";

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser'); // 쿠키 핸들링 미들웨어
const routes = require("./src/routes"); // 라우터 경로
const config = require('./src/config/key'); // DB설정
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('mongoDB connected!'))
.catch(err => console.log(err));

// 미들웨어 등록
app.use(express.json());  
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use("/", routes); 

module.exports = app;