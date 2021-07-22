"use strict";

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
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

app.use(express.static("public"));
app.use(express.json());  
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
// 모든 요청은 routes로 넘어가게됨
app.use("/", routes); 

module.exports = app;