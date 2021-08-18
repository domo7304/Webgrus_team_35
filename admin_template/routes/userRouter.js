const express = require("express");
const router = express.Router();

const {register, login, logout, deleteUser, updateUser, getAllUsers} = require('../controllers/userController');
const {auth} = require("../middleware/auth");

router.get("/auth", auth);

router.get("/logout", logout);
router.post("/join", register);
router.post("/login", login);

router.post("/deleteUser", deleteUser);
router.post("/updateUser", updateUser);
router.post("/getAllMember", getAllUsers);

module.exports = router;

/*
  라인 순서대로 대략적인 기능 소개
  logout, register, login, deleteUser, updateUser getAllUsers 는 단어 그대로
  
  auth는 client에서 request를 보낸 user의 쿠키를 가져온 후,
  해당 쿠키를 복호화하여 token을 통해 데이터베이스에 저장되어 있는 user인지 검증
  존재한다면 user정보를 넘겨주고, 존재하지 않는다면 에러 발생

  모든 API에 해당 : client에 대한 json response는 프론트 요청에 맞추어 추후 수정 필요
*/