
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const saltRounds = 10; // salt를 이용하여 암호화를 할 것. saltRounds를 salt의 자릿수를 말함
const jwt = require('jsonwebtoken'); 

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true // 공백 제거
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  loginCnt: {
    type: Number,
    default: 0
  },
  lockYn: {
    type: Boolean,
    default: false
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// mongoose에서 가져온 method, 'save' 라는 동작 이전에 어떠한 동작을 한다고 적어놓는 것
// 해당 동작이 끝난 후 다시 save 로 돌아가서 작업 진행
userSchema.pre('save', function(next){
  const user = this;

  // 비밀번호에 변경사항이 있을 때에만 암호화가 동작하도록 if문 작성
  if (user.isModified('password')){
    // salt를 이용한 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt){
      if (err) return next(err); // error 발생시 바로 app.post(/register)로 보내기
      bcrypt.hash(user.password, salt, function(err, hash){ 
        if (err) return next(err);
        user.password = hash;
        next(); // 정상적으로 암호화가 끝난 후 app.post(/register)로 돌아감
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, callback) {
  // 데이터베이스 상에 암호화된 비밀번호는 복호화할 수 없으므로
  // 입력받은 비밀번호 또한 암호화하여 DB상의 비밀번호와 비교
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) callback(err);
    // error 가 없을 경우 error는 null, isMatch 반환
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function(callback) {
  // jsonwebtoken 이용하여 토큰 생성
  const user = this;

  // DB에 저장될 때 부여되는 _id로 토큰 생성, user.token에 저장
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;

  // 성공적으로 토큰을 저장하면 user정보를 다시 반환
  user.save(function(err, user) {
    if(err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function(token, callback){
  let user = this;

  // 토큰을 복호화 decoded 에 복호화된 id가 저장될 것
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 토큰을 복호화하여 얻은 아이디로 user가 있는지 탐색
    // client에서 가져온 token과 DB에 저장되어있는 token이 일치하는지 확인
    user.findOne({"_id": decoded, "token": token}, function(err, user) {
      if(err) return callback(err);
      callback(null, user); // 일치한다면 user정보 반환
    });
  });
};

const User = mongoose.model('User', userSchema);
module.exports = { User };

/*
  나중에 es6 로 바꿔 코딩해줘야함

  export const postLogin = async (req, res) => {
    ...생략

    try {
        const token = await BlogUser.generateToken(user);
        user.token = token;
        user.save();
        return res
            .status(200)
            .cookie("x_auth", user.token)
            .json({
                loginSuccess: true,
                userId: user._id,
                message: "로그인 성공"
            });
    } catch (err) {
        return res.status(400).json({
            loginSuccess: false,
            message: "토큰 생성 실패"
        });
    }
};
-------------------------------------------------------------------------------------
//User.js
userSchema.static("generateToken", function (user) {
    return jwt.sign(user._id.toHexString(), "secretToken");
})
*/