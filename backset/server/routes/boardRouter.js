const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
//실질적인 crud가 작성되는 부분
router.post("/delete", async (req, res) => {// /delete url로 넘어오면 이 부분으로 받음. async : 순차적 처리. 곡 필요하진 않음
  try {
    await Board.remove({
      _id: req.body._id//요청받은 아이디를 받아 게시글의 어떤 글을 지울 지 판단하게 하고, remove()함수로 글을 지움
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Board.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  try {
    let obj;

    obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content
    };

    const board = new Board(obj);
    await board.save();//mongoDB상에서의 insert구문을 실행한 것
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getBoardList", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ writer: _id }, null, {//몽고 db에 저장된 스키마에서 writer가 일치하는 것을 찾는다.
      sort: { createdAt: -1 }
    });
    res.json({ list: board });//찾았을 시에는 list라는 키로 axios 통신 전송
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {//boarding detail로부터 요청 받을 시 데이터베이스에서 아이디가 있는 지 찾는다.
  try {
    const _id = req.body._id; 
    const board = await Board.find({ _id }); //아이디를 발견하였다면 json파일 형식으로 response
    res.json({ board });
  } catch (err) { //아이디가 없다면 에러 출력
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
