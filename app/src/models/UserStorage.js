"use strict";

class UserStorage {
  // 클래스 안의 변수는 const 와 같은 표현이 필요x
  // 클래스에서 직접 users에 접근하기 위해 static 선언
  // # 의 역할이 private 과 같은 건가..?
  static #users = {
    id : ["1111", "2222", "3333"],
    password : ["1111", "2222", "3333"],
    name : ["user1", "user2", "user3"],
  };
  /// 매개변수를 ...으로 해주면 입력받은 매개변수를 배열 형으로 받는다
  static getUsers(...fields){
    const users = this.#users;
    // return users;
    // 위와 같이 하면 user는 전부 받을 수 있지만 원하는 원소만 골라내는 것은 불가
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)){
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;