const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
    let error = { name: "", email: "", password: "", phone: "" };

    // 잘못된 이메일
    if (err.message === "incorrect email") {
        error.email = "이메일이 존재하지 않습니다";
    }

    // 잘못된 비밀번호
    if (err.message === "incorrect password") {
        error.password = "비밀번호를 확인해주세요";
    }

    // 중복 가입 에러
    // if (err.code === 11000) {
    //     error.email = "이미 존재하는 계정입니다";
    //     return error;
    // }

    // 이름, 비밀번호, 휴대폰 번호, 이메일 형식 에러 등
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }
    return error;
};

const createToken = (id) => {
    return jwt.sign({ id }, "secretToken", {
        expiresIn: 24 * 60 * 60 * 1000, // 토큰 유효기간은 1일로 설정
    });
};

//----------이 아래부터 기능부------------//

const auth = (req, res) => {
    // middleware/auth의 auth를 지나오며 user정보를 가져옴
    if (req.user != null) {
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true, // 임시적으로 role이 1인 user가 admin이 되도록 작성
            isAuth: true,
            name: req.user.name,
            email: req.user.email,
            created: req.user.createdAt,
            role: req.user.role,
        });
    } else {
        res.json({ isAuth: false });
    }
};

const logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(201).json({
        logoutSuccess: true,
    });
};

const register = async (req, res) => {
    try {
        // new User(req.body).save() 와 같은 동작
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: 10 * 60 * 1000 });
        res.status(201).json({
            registerSuccess: true,
        });
    } catch (err) {
        const error = handleErrors(err);
        res.json({ error });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.login(req.body.email, req.body.password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: 10 * 60 * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const error = handleErrors(err);
        res.json({ error });
    }
};

const checkEmail = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) res.json({ isDuplicated: true });
    else res.json({ isDuplicated: false });
};

const findUserEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            name: req.body.name,
            phone: req.body.phone,
        });
        res.status(200).json({ email: user.email });
    } catch (err) {
        res.json({ msg: "등록되지 않은 회원입니다" });
    }
};

const changeUserPw = async (req, res) => {
    // try {
    //   const filter = { name: req.body.name, email: req.body.email, phone: req.body.phone };
    //   const update = { password: req.body.password };
    //   const user = await User.findOneAndUpdate(filter, update);
    //   console.log(user);
    //   await user.save();
    //   res.status(200).json({ msg: '비밀번호가 성공적으로 변경되었습니다' });
    // }
    // catch(err){
    //   console.log(err.message);
    //   res.json({ msg: '등록되지 않은 회원입니다' });
    // }

    const user = await User.findOne({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });

    User.findByIdAndUpdate(
        { _id: user._id },
        { password: req.body.password },
        function (err, user) {
            if (err) {
                return next(err);
            } else {
                user.password = req.body.password;
                user.save(function (err, user) {
                    if (err) {
                        res.send("Error: ", err);
                    } else {
                        res.send("비밀번호가 성공적으로 변경되었습니다");
                    }
                });
            }
        }
    );
};

module.exports = {
    auth,
    logout,
    register,
    login,
    checkEmail,
    findUserEmail,
    changeUserPw,
};
