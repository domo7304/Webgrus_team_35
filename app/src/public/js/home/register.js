"use strict";

const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  password = document.querySelector("#password"),
  confirmPassword = document.querySelector("#confirm-password"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register(){
  const req = {
    id: id.value,
    name: name.value,
    password: password.value,
    passwordConfirm: confirmPassword.value,
  };
  
  // fetch를 통해 입력받은 id, pw를 서버로 전달
  fetch("/register", {
    // 얕은 지식으로...HTTP 프로토콜에서 '생성'은 'POST'스이기 때문에 method로 post를 쓴다는 것이 REST API 의 권고안...잘 모르겠다
    method: "POST", // REST API 와 관련된 내용, REST API가 무엇인지 다시 공부하고 오기
    headers: {
      // 내가 전달하는 데이터 타입이 어떤 데이터 타입인지 headers 를 통해 알려줌
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(req)
  })
  // 서버로부터 응답을 받은 순간 promise 객체를 반환한다고..?
  // promise 객체를 반환했기 때문에 then으로부터 접근이 가능?
  .then((res) => res.json())
  .then((res) => {
    // 서버로부터 받은 response값이 true면 루트로 이동
    if (res.success) {
      location.href = "/login";
    // false일 경우 response return 값의 msg를 띄워줌ㄴ
    } else {
      alert(res.msg);
    }
  })
  // 에러 처리
  .catch((err) => {
    console.error(new Error("회원가입 중 에러 발생"));
  });
}