const express = require("express");
const router = express.Router();
const ctrl = require("../controller/boardController");

router.post("/deletePost", ctrl.deletePost);
router.post("/updatePost", ctrl.updatePost);
router.post("/writePost", ctrl.writePost);
router.post("/getBoardList", ctrl.getBoardList);
router.post("/detail", ctrl.detail);

module.exports = router;

/*
  설명할 점이 있으시다면 주석 남겨주시기 바랍니다!
*/