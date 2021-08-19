import axios from "axios";
import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    CheckButton,
    IDContainer,
} from "./signElement";

const SignUp1 = () => {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputPwRe, setInputPwRe] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputEmail, setInputEmail] = useState(""); //?
    const [inputName, setInputName] = useState("");

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };
    const handleInputPwRe = (e) => {
        setInputPwRe(e.target.value);
    };
    const handleInputPhone = (e) => {
        setInputPhone(e.target.value);
    };
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };
    const handleInputName = (e) => {
        setInputName(e.target.value);
    }; //나중에 custom hook 활용하여 묶기

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            name: inputName,
            email: inputId,
            password: inputPw,
            phone: inputPhone,
        };

        // console.log( `${body.name} ${body.email} ${body.password} ${body.phone}`);

        if (inputPw != inputPwRe) alert("비밀번호가 일치하지 않습니다");

        await axios
            .post("/api/user/register", body)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent onSubmit={onSubmitHandler}>
                        <Form>
                            <FormH1>회원 가입</FormH1>
                            <FormLabel htmFor="for">ID</FormLabel>
                            <IDContainer>
                                <FormInput
                                    type="ID"
                                    value={inputId}
                                    onChange={handleInputId}
                                    requiredrequired
                                />
                                <CheckButton>중복확인</CheckButton>
                            </IDContainer>
                            <FormLabel htmFor="for">PW</FormLabel>
                            <FormInput
                                type="PW"
                                value={inputPw}
                                onChange={handleInputPw}
                                required
                            />
                            <FormLabel htmFor="for">PW 확인</FormLabel>
                            <FormInput
                                type="PW_re"
                                value={inputPwRe}
                                onChange={handleInputPwRe}
                                required
                            />
                            <FormLabel htmFor="for">휴대폰 번호</FormLabel>
                            <FormInput
                                type="phone"
                                value={inputPhone}
                                onChange={handleInputPhone}
                                required
                            />
                            <FormLabel htmFor="for">이메일</FormLabel>
                            <IDContainer>
                                <FormInput
                                    type="email"
                                    value={inputEmail}
                                    onChange={handleInputEmail}
                                    required
                                />
                                <CheckButton>이메일 인증</CheckButton>
                            </IDContainer>
                            <FormLabel htmFor="for">이름</FormLabel>
                            <FormInput
                                type="name"
                                value={inputName}
                                onChange={handleInputName}
                                required
                            />
                            <FormButton type="submit">회원가입</FormButton>
                            <TextContainer justify-content="flex-end">
                                <Text to="login">
                                    이미 계정이 있나요? 로그인 하세요
                                </Text>
                            </TextContainer>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container1>
        </>
    );
};

export default SignUp1;
