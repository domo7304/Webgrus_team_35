"use strict";

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login(){
  const req = {
    id: id.value,
    password: password.value,
  };
  
  // fetch를 통해 입력받은 id, pw를 서버로 전달
  fetch("/login", {
    // 얕은 지식으로...HTTP 프로토콜에서 '생성'은 'POST'이기 때문에 method로 post를 쓴다는 것이 REST API 의 권고안...잘 모르겠다
    method: "POST", // REST API 와 관련된 내용, REST API가 무엇인지 다시 공부하고 오기
    headers: {
      // 내가 전달하는 데이터 타입이 어떤 데이터 타입인지 headers 를 통해 알려줌
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(req)
  })
  .then((res) => res.json())
  .then((res) => {
    // 서버로부터 받은 response값이 true면 루트로 이동
    if (res.success) {
      location.href = "/";
    // false일 경우 response return 값의 msg를 띄워줌
    } else {
      alert(res.msg);
    }
  })
  // 에러 처리
  .catch((err) => {
    console.error(new Error("로그인 중 에러 발생"));
  });
}