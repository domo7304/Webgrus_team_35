const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const cookieParser = require('cookie-parser');

const { auth } = require("../middleware/auth");
const { User } = require("../schemas/user");
// use가 get, post 보다 아래에 있으니깐 mongoDB가 제대로 동작을 안한다....
// 나중에 이유 꼭 찾아보기
router.use(express.json());
router.use(express.urlencoded({extended: true})); 
router.use(cookieParser());

//회원가입
router.post("/join", async (req, res) => { //LoginForm.js -> "/member/join"의 url을 통해 이곳으로 오게 된다.
  try {
    const user = new User(req.body);
    console.log(user);
  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err});
    return res.status(200).json({ // status 200은 성공했다는 뜻..?
      success: true,
    });
  })
    /*let obj = { email: req.body.email };

    let user = await User.findOne(obj);
    

    if (user) {
      res.json({
        message: "이메일이 중복되었습니다. 새로운 이메일을 입력해주세요.",
        dupYn: "1"
      });
    } else {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
          console.log(err);
        } else {
          crypto.pbkdf2(
            req.body.password,
            buf.toString("base64"),
            100000,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
                console.log(err);
              } else {
                console.log(key.toString("base64"));
                buf.toString("base64");
                obj = {
                  email: req.body.email,
                  name: req.body.name,
                  password: key.toString("base64"),
                  salt: buf.toString("base64")
                };
                user = new User(obj);
                await user.save();
                res.json({ message: "회원가입 되었습니다!", dupYn: "0" });
              }
            }
          );
        }
      });
    }*/
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

//로그인
router.post("/login", async (req, res) => {
  try {
    // 입력한 정보가 데이터베이스에 있는지 탐색
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user){
      return res.json({
        success: false,
        msg: "아이디가 존재하지 않습니다"
      })
    }
    
    // 입력한 정보가 데이터베이스에 있다면, 입력한 정보와 저장되어있는 정보가 일치하는지 확인
    // comparePassword 라는 이름으로 비밀번호를 비교하는 method 만들어줄 것
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch){
        return res.json({
          success: false,
          msg: "비밀번호를 확인해주세요"
        })
      }

      // 정보가 일치한다면 토큰 생성
      // generateToken 이라는 이름으로 토큰을 생성해주는 method 만들어줄 것
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); // 400..? error가 있다는 뜻..? 나중에 찾아보기
        // 토큰을  쿠키, 세션, 로컬스토리지 등 여러 곳에 저장할 수 있지만 일단 쿠키를 사용
        res.cookie("x_auth", user.token)
        .status(200).json({
          success: true,
          userId: user._id 
        })
      })
    })
  })
  } catch (err) {
    console.log(err);
    res.json({ message: "로그인 실패" });
  }
});

router.get('/api/users/auth', auth, (req, res) => {
  // 해당 get까지 도착했다는 것은 middleware/auth 를 통과했다는 뜻
  // middleware로부터 받은 user정보 중 client가 필요로하는 정보만 json으로 전달해주면 됨
  // 백엔드 코드 병합 시 어떤 정보가 필요할지 물어보기
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // 임시적으로 role이 1인 user가 admin이 되도록 작성해놓은 것
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
});

router.get("/logout", (req, res) => {
  // 로그아웃은 간단히 DB에 저장되어있는 user의 token을 지워줌으로써 사용자 인증이 되지 않도록 구현
  // 작성해둔 auth 미들웨어를 통해 DB에 있는 user 정보를 받아올 수 있음. 이를 이용
  User.findOneAndUpdate({ _id: req.user._id}, { token: ""}, (err, user) => {
    if (err) return res.json({
      success: false,
      err
    });
    return res.status(200).send({
      success: true
    })
  })
});

router.post("/delete", async (req, res) => {
  try {
    await User.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.update({
      _id: req.body._id,
      name: req.body.name
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getAllMember", async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ message: user });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
