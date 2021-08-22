import axios from "axios";
import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

import {
    Container1,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text,
    TextContainer,
} from "./signElement";

const SignIn = () => {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다(state)
    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    // login 버튼 클릭 event 발생 시
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            email: inputId,
            password: inputPw,
        };

        const res = await axios.post("/api/user/login", body);
        console.log(res.data);
        console.log(res);

        if (res.data.error) {
            console.log(res.data.error);
            console.log(res.data.error.email);
            console.log(res.data.error.password);
            if (
                JSON.stringify(res.data.error.email).replace(/\"/gi, "") != ""
            ) {
                alert(JSON.stringify(res.data.error.email).replace(/\"/gi, ""));
            }
            if (
                JSON.stringify(res.data.error.password).replace(/\"/gi, "") !=
                ""
            ) {
                alert(
                    JSON.stringify(res.data.error.password).replace(/\"/gi, "")
                );
            }
        }

        // 로그인 확인 후 홈페이지로 이동하도록
        if (res.data.user) {
            console.log(`res.data.user: ${res.data.user}`); // 콘솔 확인용, 지우셔도 되요
            window.location.assign("/");
        }

        // axios
        //     .post("/api/user/login", body)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         alert("로그인 실패");
        //     });
    };

    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent onSubmit={onSubmitHandler}>
                        <Form>
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmFor="for">Email</FormLabel>
                            <FormInput
                                type="id"
                                value={inputId}
                                onChange={handleInputId}
                                required
                            />
                            <FormLabel htmFor="for">Password</FormLabel>
                            <FormInput
                                type="password"
                                value={inputPw}
                                onChange={handleInputPw}
                                required
                            />
                            <FormButton type="submit">로그인</FormButton>
                            <TextContainer>
                                <Text to="findid">ID 찾기</Text>
                                <Text to="findpw">비밀번호 찾기</Text>
                                <Text to="signup">회원가입</Text>
                            </TextContainer>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container1>
        </>
    );
};
export default SignIn;
