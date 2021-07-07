"use strict";

// 모듈
const express = require("express");
const app = express();

// 라우팅
const home = require("./routes/home");

// 앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // use => 미들 웨어를 등록한다, 일단은 암기

module.exports = app;