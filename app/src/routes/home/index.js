"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

// app.js 파일 안의 app.use 코드를 통해서 routes/home/index.js 로 진입
// router.get(), router.post() 에 각 해당하는 경로에 맞는 콜백함수를 실행하게 됨
// 라우팅 역할
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);


module.exports = router;