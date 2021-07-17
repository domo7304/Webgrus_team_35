"use strict";

const fs = require("fs").promises;

class UserStorage {
  // 클래스에서 직접 users에 접근하기 위해 static 선언
  // 전달받은 data를 parse하고, id로 user정보를 가져오는 기능을 분리, 이렇듯 뭔가 특징적인 함수는 최상단에 올려두는 것이 관례.
  static #getUserById(data, id){
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id); // 매개변수로 입력받은 id가 users의 id 배열 중 몇 번째인지 인덱스를 return
    const usersKeys = Object.keys(users); // users 객체가 가지는 key값들을 배열로 return
    const user = usersKeys.reduce((newUsers, key) => {
      newUsers[key] = users[key][idx]; // users 객체에서 key에 해당하는 애들 중 idx번째 값을 newUser의 key로 저장
      return newUsers;
    }, {});
    return user;
  }

  static #getUsers(data, isAll, fields){
    const users = JSON.parse(data);
    if (isAll) return users;
    // 위와 같이 단순히 return users는 전체 users 정보는 받을 수 있지만 원하는 원소만 골라내는 것은 불가
    // 아래와 같이 reduce를 사용하여, 원하는 정보만을 받아올 수도 있음
    
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)){
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
    // => 기존의 코드를 fs를 사용하도록 수정하고 해당 코드가 핵심 기능이므로 가독성을 위해 분리
  }

  // 매개변수를 ...으로 해주면 입력받은 매개변수를 배열 형으로 받는다 
  // 여기서는 fields 라는 이름을 갖는 배열이 되는 것
  static getUsers(isAll, ...fields){
    return fs // promise 반환을 이용하여 then, catch 를 통해 user값 반환
    .readFile("./src/databases/users.json")
    .then((data) => { 
      // 은닉화된 method 호출
      return this.#getUsers(data, isAll, fields); 
    })
    .catch((err) => console.error(err));
  }

  static getUserById(id){
    // 파일입출력을 이용하여 users.json이라는 파일로부터 데이터를 읽어와 JSON을 우리가 볼 수 있도록 parse할 것
    // 가독성을 위해 then 내부에 parse 동작을 직접 넣지 않고, 은닉화된 method를 하나 더 만들어주어 기능을 분리해줌
    return fs // promise 반환을 이용하여 then, catch 를 통해 user값 반환
    .readFile("./src/databases/users.json")
    .then((data) => { 
      // 은닉화된 method 호출
      return this.#getUserById(data, id); 
    })
    .catch((err) => console.error(err));
  }

  // 해당 부분에서도 async 없이 작동시키면 user정보를 가져오기 전에 Promise <pending> 이 출력됨
  static async save(userInfo){
    // 파일에 data를 추가해주기 위해서는 기존의 데이터를 전부 가져온 후 (그냥 추가하게 되면 덮어씌워진다)
    // 해당 파일에 data를 추가하고 다시 write해주어야 한다.
    const users = await this.getUsers(true); // true는 모든 파라미터를 다 가져온다는 뜻
    if (users.id.includes(userInfo.id)){
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    // fs.readFile과 다르게 writeFile은 retun 값이 없음 그냥 return 작성
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;