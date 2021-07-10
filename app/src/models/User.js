"use strict";

const UserStorage = require("./UserStorage");

class User{
  constructor(body) {
    this.body = body;
  }

  // 입력받은 id 와 
  login(){
    const body = this.body;
    const {id, password} = UserStorage.getUserById(body.id); // getUserById로 가져온 id, pw 를 객체로 직접 저장

    if (id){ // 입력한 id가 UserStorage에 있다면
      if (body.id === id && body.password === password){
        return { success: true }; // id와 pw가 맞을 경우
      }
      return { success: false, msg: "비밀번호를 확인해주세요." }; // id 는 존재, pw가 잘못되었을 경우
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." }; // id 조차 존재하지 않는 경우
  }
}

module.exports = User;