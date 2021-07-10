"use strict";

const User = require("../../models/User");

// home과 login 페이지를 렌더링 하는 메서드를 output 객체로 묶어주기
const output = {
  home : (req, res) => {
    res.render("home/index");
  },  
  login : (req, res) =>{
    res.render("home/login");
  },
};

// 로그인 기능을 위한 API를 process 객체로 묶어주기 
const process = {
  login : (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
  },
};

module.exports ={
  output,
  process,
};