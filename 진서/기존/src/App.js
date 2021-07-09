import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

  /*  // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        console.log("click login");
    };

    // 페이지 렌더링 후 가장 처음 호출되는 함수
    useEffect(
        () => {
            axios
                .get("/user_inform/login")
                .then((res) => console.log(res))
                .catch();
        },
        // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
        []
    );*/

    return (
        //html
        <Fragment className="page">
            <div className="navBar">navBar</div>
            <div className="loginBox">
                <div>
                    ID :<input></input>
                </div>
                <div>
                    PW :<input type="password"></input>
                </div>

                <div>
                    <button>LOGIN</button>
                </div>
                <div>
                    <p>아이디 찾기</p>
                    <p>비밀번호 찾기</p>
                    <p>회원가입</p>
                </div>
            </div>
            <div className="footer">footer</div>
        </Fragment>
    );
}

export default App;
