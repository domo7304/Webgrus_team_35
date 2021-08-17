const { User } = require("../models/User");

const auth = (req, res, next) => {
  // 사용자의 요청이 인증을 필요로 할 때마다 client <-> server 간 사용자 인증을 처리
  // client 쿠키에서 토큰을 가져와 verify
  const token = req.cookies.jwt;

  if (token){
    jwt.verify(token, 'secretToken', (err, decodedToken) => {
      if (err){
        console.log(err.message);
        // 로그인페이지로 이동시키기
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    // 로그인페이지로 이동시키기
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token){
    jwt.verify(token, 'secretToken', async (err, decodedToken) => {
      if (err){
        console.log(err.message);
        req.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        req.user = user;
        next();
      }
    });
  } else {
    res.user = null;
    next();
  }
}

module.exports = { 
  auth,
  checkUser
};