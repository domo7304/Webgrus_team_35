
const { User } = require("../models/User");

const auth = (req, res, next) => {
  // 사용자의 요청이 인증을 필요로 할 때마다 client <-> server 간 사용자 인증을 처리

  // client 쿠키에서 토큰을 가져옴
  const token = req.cookies.x_auth;

  // 토큰을 복호화한 후 user를 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 복호화한 토큰으로 user를 찾지 못했다면 client에게 isAuth, error 라는 json 전달
    if (!user) return res.json({
        isAuth: false,
        error: true
    });
    // 미들웨어를 통해 인증이 확인, token과 user정보를 넘겨주기 
    // next()를 통해 다시 app.get(/auth) 로 돌아가 작업
    req.token = token;
    req.user = user;
    next();
  });
}

module.exports = { auth };