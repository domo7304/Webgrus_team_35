"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./controller");

// app.js 파일의 app.use("/", routes); 통해서 routes/index.js 로 진입
// router.get(), router.post() 에 각 해당하는 경로에 맞는 콜백함수를 실행하도록 라우팅하는 역할

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

router.get("/auth", ctrl.process.auth);
router.get("/logout", ctrl.process.logout);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router;