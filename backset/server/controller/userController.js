
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let error = { name: '', email: '', password: '' };

  // 잘못된 이메일
  if (err.message === 'incorrect email'){
    error.email = '이메일이 존재하지 않습니다';
  }

  // 잘못된 비밀번호
  if (err.message === 'incorrect password'){
    error.password = '비밀번호를 확인해주세요';
  }

  // 중복 가입 에러
  if (err.code === 11000){
    error.email = '이미 존재하는 계정입니다';
    return error;
  }

  // 이름, 비밀번호, 휴대폰 번호, 이메일 형식 에러 등
  if (err.message.includes('User validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
}

const createToken = (id) => {
  return jwt.sign({ id }, 'secretToken'), {
    expiresIn: 30 // 일단 만료시간을 20s로 설정, 추후 변경
  }
}

//----------이 아래부터 기능부------------//

const checkUser = (req, res) => {
  // middleware/auth의 checkUser를 지나오며 user정보를 가져옴
  if (req.user != null){
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true, // 임시적으로 role이 1인 user가 admin이 되도록 작성해놓은 것
      isAuth: true,
      name: req.user.name,
      email: req.user.email,
      created: req.user.createdAt,
      role: req.user.role
    });
  } else {
    res.json({ loginState: false });
  }
};

const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
};

const register = async (req, res) => {
  try{
    // new User(req.body).save() 와 같은 동작
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie('jwt', token, {maxAge: 3 * 10 * 1000});
    res.status(201).json({
      registerSuccess: true
    });
  }
  catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  try{
    const user = await User.login(req.body.email, req.body.password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {maxAge: 30 * 1000});
    res.status(200).json({ user: user._id });
  }
  catch(err){
    const error = handleErrors(err);
    res.json({ error });
  }
};

// const findUserEmail = async (req, res) => {
//   try {
//     const user = await User.find
//   }
// }

module.exports = {
  checkUser,
  logout,
  register,
  login
};