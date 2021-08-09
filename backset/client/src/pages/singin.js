import axios from "axios";
import React, { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
//import{router.post} from "../../../server/routes/memberRouter";

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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: inputId,
            password: inputPw,
        };

    };

    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent onSubmit={onSubmitHandler}>
                        <Form>
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel
                                htmFor="for"
                                value={inputId}
                                onChange={handleInputId}
                            >
                                ID
                            </FormLabel>
                            <FormInput type="id" required />
                            <FormLabel
                                htmFor="for"
                                value={inputPw}
                                onChange={handleInputPw}
                            >
                                Password
                            </FormLabel>
                            <FormInput type="password" required />
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
