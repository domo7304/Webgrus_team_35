
const Board = require("../models/Board");

const deletePost = async (req, res) => {
  try {
    await Board.deleteOne({
      _id: req.body._id //요청받은 아이디를 받아 게시글의 어떤 글을 지울 지 판단하게 하고, remove()함수로 글을 지움
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

const updatePost = async (req, res) => {
  try {
    await Board.updateOne(
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
};

const writePost = async (req, res) => {
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
};

const getBoardList = async (req, res) => {
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
};

const detail = async (req, res) => {
  try {
    const _id = req.body._id; 
    const board = await Board.find({ _id }); //아이디를 발견하였다면 json파일 형식으로 response
    res.json({ board });
  } catch (err) { //아이디가 없다면 에러 출력
    console.log(err);
    res.json({ message: false });
  }
};

module.exports = {
  deletePost,
  updatePost,
  writePost,
  getBoardList,
  detail
}