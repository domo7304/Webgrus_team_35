"use strict";

// models 을 사용하기 위해 require로 가져오기
const UserStorage = require("../../models/UserStorage");

// home과 login 페이지를 렌더링 하는 메서드를 output 객체로 묶어주기
const output = {
  home : (req, res) => {
    res.render("home/index");
  },  
  login : (req, res) =>{
    res.render("home/login");
  },
};

// 로그인 기능을 위한 메서드를 process 개게로 묶어주기 
// 강의에서는 로그인 기능을 위한 API라고 했는데, 객체 안에 있는 함수는 메소드 아닌가..? 어떤 경우 어떤 것을 API라 부르는지 개념 공부 해야함
const process = {
  login : (req, res) => {
    const id = req.body.id,
        password = req.body.password;

    const users = UserStorage.getUsers("id", "password");

    const response = {};
    if (users.id.includes(id)){
      const idx = users.id.indexOf(id);

      if (users.password[idx] === password){
        response.success = true;
        return res.json(response);
      }
    }
    
    response.success = false;
    response.msg = "로그인에 실패했습니다";
    return res.json(response);
  },
};

module.exports ={
  output,
  process,
};