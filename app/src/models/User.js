"use strict";

const UserStorage = require("./UserStorage");

class User{
  constructor(body) {
    this.body = body;
  }

  async login(){ // promise객체의 반환을 기다리기 위한 await은 async함수 안에서만 사용가능
    const client = this.body;
    // console.log(await UserStorage.getUserById(client.id)); 
    // UserStorage.getUserById() 로 가져온 값을 getUserById() 함수와 현재 login()함수에서 console.log를 통해 출력해보면, 
    // Promise <pending> 이 먼저 출력된 뒤 {id: , password: , name} user 정보가 출력된다
    // Node.js의 비동기적 특성에 의해 UserStorage.getUserById()로부터 return을 받기도 전에 promise를 찍어버리는 것, 이를 막기 위해 await을 작성해준다.

    const {id, password} = await UserStorage.getUserById(client.id); // getUserById로 가져온 id, pw 를 객체로 직접 저장

    if (id){ // 입력한 id가 UserStorage에 있다면
      if (client.id === id && client.password === password){
        return { success: true }; // id와 pw가 맞을 경우
      }
      return { success: false, msg: "비밀번호를 확인해주세요." }; // id 는 존재, pw가 잘못되었을 경우
    }
    return { success: false, msg: "존재하지 않는 아이디입니다." }; // id 조차 존재하지 않는 경우
  }

  // User 모델에서는 넘겨받은 body를 UserStorage로 던져주기만 하고, 실제 기능은 UserStorage에서 구현할 예정
  register() {
    const client = this.body;
    const response = UserStorage.save(client);
    return response;
  }
}

module.exports = User;