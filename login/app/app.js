"use strict";

// express 프레임워크  require로 가져오기
const express = require("express");
const app = express();

// 작성한 라우터(src/routes) require로 가져오기
// 폴더 경로 지정 후 파일 경로를 따로 지정해주지 않으면 먼저 index 파일을 찾아 읽게 된다.
const home = require("./src/routes/home");

// view 경로 설정, 화면 engine을 ejs로 설정
app.set("views", "./src/views");
app.set("view engine", "ejs");

// 무슨 역할인지 모르겠음..
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());

// url을 통해 전달되는 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({extended: true}));

app.use("/", home); // use => 미들 웨어를 등록한다, 일단은 암기

module.exports = app; 