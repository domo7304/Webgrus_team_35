"use strict";

const User = require("../models/User");

const auth = (req, res) => { 
  const token = req.cookies.x_auth;

  // 토큰을 복호화한 후 user를 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 복호화한 토큰으로 user를 찾지 못했다면 client에게 isAuth, error 라는 json 전달
    if (!user) return res.json({
        isAuth: false,
        error: true
    });
    // token과 user정보를 넘겨주기 
    req.token = token;
    req.user = user;
  });

  // DB로부터 가져온 user정보 중 client가 필요로하는 정보만 json으로 전달해주면 됨
  // 백엔드 코드 병합 시 어떤 정보가 필요할지 물어보기
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // 임시적으로 role이 1인 user가 admin이 되도록 작성해놓은 것
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role
  });
};

const logout = (req, res) => {
  const token = req.cookies.x_auth;

  // 토큰을 복호화한 후 user를 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 복호화한 토큰으로 user를 찾지 못했다면 client에게 isAuth, error 라는 json 전달
    if (!user) return res.json({
        isAuth: false,
        error: true
    });
    // token과 user정보를 넘겨주기 
    req.token = token;
    req.user = user;
    console.log(req);
  });

  User.findOneAndUpdate({ _id: req.user._id}, { token: ""}, (err, user) => {
    if (err) return res.json({
      success: false,
      err
    });
    return res.status(200).send({
      success: true
    });
  });
};

const login = (req, res) => {
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
};

const register = (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({success: false, err});
    return res.status(200).json({ // status 200은 성공했다는 뜻..?
      success: true,
    });
  });
};

module.exports = {
  auth,
  logout,
  login,
  register
};