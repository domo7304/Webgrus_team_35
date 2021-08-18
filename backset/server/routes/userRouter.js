const express = require("express");
const router = express.Router();

const ctrl = require("../controller/userController");
// const { auth, checkUser } = require("../middleware/auth");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, ctrl.auth);
router.get("/logout", auth, ctrl.logout);

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/findUserEmail", ctrl.findUserEmail);
router.post("/changeUserPw", ctrl.changeUserPw);

module.exports = router;

/*
  대략적인 기능 소개
  logout, register, login은 단어 그대로
  
  auth는 client에서 request를 보낸 user의 쿠키를 가져온 후,
  해당 쿠키의 jwt를 받아와 데이터베이스에 저장되어 있는 user인지 검증
  checkUser는 마찬가지로 쿠키의 jwt를 받아와 jwt.verify를 통해 토큰을 decode하여 user정보를 가져옴
*/