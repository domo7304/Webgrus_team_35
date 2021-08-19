const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "이름을 입력해주세요"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // 공백 제거
        validate: [isEmail, "이메일이 형식이 아닙니다"],
    },
    password: {
        type: String,
        required: [true, "비밀번호를 입력해주세요"],
        trim: true,
        minlength: [8, "비밀번호는 최소 8자리 이상이어야 합니다"],
    },
    phone: {
        type: String,
        required: [true, "휴대폰 번호를 입력해주세요"],
        trim: true,
        minlength: [10, "휴대폰 번호는 10 ~ 11 자리이어야 합니다"],
        maxlength: [11, "휴대폰 번호는 10 ~ 11 자리이어야 합니다"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    money: {
        type: Number,
        default: 0,
    },
    time: {
        type: Number,
        default: 0,
    },
    role: {
        type: Number,
        default: 0,
    },
});

// mongoose에서 가져온 method, 'save' 라는 동작 이전에 어떠한 동작을 한다고 적어놓는 것
// 해당 동작이 끝난 후 다시 save 로 돌아가서 작업 진행
userSchema.pre("save", async function (next) {
    const user = this;

    // 일반적인 user정보를 수정할 때마다 암호화가 작동할 필요는 없으므로
    // 비밀번호에 변경사항이 있을 때에만 암호화가 동작하도록 if문 작성
    if (user.isModified("password")) {
        const saltRounds = 10; // salt를 이용하여 암호화를 할 것. saltRound는 salt의 자릿수를 말함
        const salt = await bcrypt.genSalt(saltRounds);

        user.password = await bcrypt.hash(user.password, salt);
        next(); // 정상적으로 암호화가 끝난 후 app.post(/register)로 돌아감
    } else {
        next();
    }
});

userSchema.statics.login = async function (email, password) {
    // 입력한 정보가 데이터베이스에 있는지 탐색
    const user = await this.findOne({ email });

    //입력한 정보가 데이터베이스에 있다면, 입력한 정보와 저장되어있는 정보가 일치하는지 확인
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) return user;
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;

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
