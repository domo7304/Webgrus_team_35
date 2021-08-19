const express = require("express");
const router = express.Router();

const ctrl = require("../controller/userController");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, ctrl.auth);
router.get("/logout", auth, ctrl.logout);

router.post("/checkEmail", ctrl.checkEmail);
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/findUserEmail", ctrl.findUserEmail);
router.post("/changeUserPw", ctrl.changeUserPw);

module.exports = router;