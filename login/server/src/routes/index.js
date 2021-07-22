"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./controller");
const auth = require("../middleware/auth");

// app.js 파일의 app.use("/", routes); 통해서 routes/index.js 로 진입
// router.post() 에 각 해당하는 경로에 맞는 콜백함수를 실행하도록 라우팅하는 역할

router.get("/api/users/auth", auth, ctrl.auth);
router.get("/api/users/logout", auth, ctrl.logout);

router.post("/api/users/login", ctrl.login);
router.post("/api/users/register", ctrl.register);

module.exports = router;