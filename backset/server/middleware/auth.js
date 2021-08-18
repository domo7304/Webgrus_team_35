const User = require("../models/User");
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // 사용자의 요청이 인증을 필요로 할 때마다 client <-> server 간 사용자 인증을 처리
  // client 쿠키에서 토큰을 가져와 verify
  
  const token = req.cookies.jwt;

  if (token){
    jwt.verify(token, 'secretToken', async (err, decodedToken) => {
      if (err){
        req.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        req.user = user;
        next();
      }
    });
  } else {
    console.log(`사용자 정보가 존재하지 않습니다`);
    res.user = null;
    next();
  }
  
  // const token = req.cookies.jwt;

  // if (token){
  //   jwt.verify(token, 'secretToken', (err, decodedToken) => {
  //     if (err){
  //       console.log(err.message);
  //       next();
  //     } else {
  //       console.log(decodedToken);
  //       next();
  //     }
  //   });
  // } else {
  //   next();
  // }
}

// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token){
//     jwt.verify(token, 'secretToken', async (err, decodedToken) => {
//       if (err){
//         req.user = null;
//         next();
//       } else {
//         let user = await User.findById(decodedToken.id);
//         req.user = user;
//         next();
//       }
//     });
//   } else {
//     console.log(`사용자 정보가 존재하지 않습니다`);
//     res.user = null;
//     next();
//   }
// }

module.exports = { 
  auth,
  //checkUser
};