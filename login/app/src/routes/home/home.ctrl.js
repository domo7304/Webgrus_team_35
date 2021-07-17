"use strict";

const User = require("../../models/User");

// home과 login 페이지를 렌더링 하는 메서드를 output 객체로 묶어주기
const output = {
  home : (req, res) => {
    res.render("home/index");
  },  
  login : (req, res) => {
    res.render("home/login");
  },
  register : (req, res) => {
    res.render("home/register");
  },
};

// 로그인 기능을 위한 API를 process 객체로 묶어주기 
const process = {
  login : async(req, res) => {
    const user = new User(req.body);
    // UserStorage.getUserById() -> user.login() 과정에서 async, await 이므로, 얘로 async, await 처리
    // await 처리를 해주지 않으면 user.login()으로부터 success, msg 등을 return받기 전에 response를 보내버려서 
    // login.js 의 then(res) 부분에서 success, msg 모두 undefined 이므로 alert(res.msg); 에 의해 undefined 출력
    const response = await user.login(); 
    return res.json(response);
  },
  register : async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  }
};

module.exports ={
  output,
  process,
};