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
    let checker = {
        emailChecker: false,
        pwChecker: false,
    };
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputPwRe, setInputPwRe] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    // const [inputEmail, setInputEmail] = useState(""); //?
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
    // const handleInputEmail = (e) => {
    //     setInputEmail(e.target.value);
    // };
    const handleInputName = (e) => {
        setInputName(e.target.value);
    }; //나중에 custom hook 활용하여 묶기

    const checkEmail = async (e) => {
        e.preventDefault();
        const body = { email: inputId };
        fetch("/api/user/checkEmail", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(`${data.isDuplicated}`);
                if (data.isDuplicated == true) {
                    //true 이미 있는 이메일, false 가입 가능
                    alert("이미 사용 중인 이메일입니다.");
                } else {
                    alert("사용 가능한 이메일입니다.");
                    checker.emailChecker = true;
                }
            });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const body = {
            name: inputName,
            email: inputId,
            password: inputPw,
            phone: inputPhone,
        };

        // console.log( `${body.name} ${body.email} ${body.password} ${body.phone}`);

        if (inputPw == inputPwRe) {
            checker.pwChecker = true;
        } else {
            alert("비밀번호가 일치하지 않습니다");
        }

        if (checker.emailChecker == false) {
            alert("이메일 중복 확인이 필요합니다");
        }

        if ((checker.pwChecker && checker.emailChecker) == true) {
            // await axios
            //     .post("/api/user/register", body)
            //     .then((res) => res.json())
            //     .then((data) => {
            //         console.log(data.registerSuccess);
            //         alert(
            //             "회원가입이 정상적으로 완료되었습니다. 로그인 페이지로 이동합니다"
            //         );
            //         window.location.assign("/login");
            //     });

            const res = await axios.post("/api/user/register", body);

            if (res.data.user) {
                console.log(`res.data.user: ${res.data.user}`); // 콘솔 확인용, 지우셔도 되요
                window.location.assign("/");
            } else if (res.data.error) {
                // console.log(res.data.error);
                // console.log(res.data.error.email);
                // console.log(res.data.error.password);
                // console.log(res.data.error.phone);
                // console.log(res.data.error.name);
                if (
                    JSON.stringify(res.data.error.email).replace(/\"/gi, "") !=
                    ""
                ) {
                    alert(
                        JSON.stringify(res.data.error.email).replace(/\"/gi, "")
                    );
                }
                if (
                    JSON.stringify(res.data.error.password).replace(
                        /\"/gi,
                        ""
                    ) != ""
                ) {
                    alert(
                        JSON.stringify(res.data.error.password).replace(
                            /\"/gi,
                            ""
                        )
                    );
                }
                if (
                    JSON.stringify(res.data.error.phone).replace(/\"/gi, "") !=
                    ""
                ) {
                    alert(
                        JSON.stringify(res.data.error.phone).replace(/\"/gi, "")
                    );
                }
                if (
                    JSON.stringify(res.data.error.name).replace(/\"/gi, "") !=
                    ""
                ) {
                    alert(
                        JSON.stringify(res.data.error.name).replace(/\"/gi, "")
                    );
                }
                if (
                    JSON.stringify(res.data.error.name).replace(/\"/gi, "") ==
                        "" &&
                    JSON.stringify(res.data.error.phone).replace(/\"/gi, "") ==
                        "" &&
                    JSON.stringify(res.data.error.email).replace(/\"/gi, "") ==
                        "" &&
                    JSON.stringify(res.data.error.password).replace(
                        /\"/gi,
                        ""
                    ) == ""
                ) {
                    window.location.assign("/");
                }
            }
        }
    };

    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent onSubmit={onSubmitHandler}>
                        <Form>
                            <FormH1>회원 가입</FormH1>
                            <FormLabel htmFor="for">Email</FormLabel>
                            <IDContainer>
                                <FormInput
                                    type="ID"
                                    value={inputId}
                                    onChange={handleInputId}
                                    requiredrequired
                                />
                                <CheckButton onClick={checkEmail}>
                                    중복확인
                                </CheckButton>
                            </IDContainer>
                            <FormLabel htmFor="for">
                                PW * 최소 8자리 이상
                            </FormLabel>
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
                            <FormLabel htmFor="for">
                                휴대폰 번호 * 10~11자리{" "}
                            </FormLabel>
                            <FormInput
                                type="phone"
                                value={inputPhone}
                                onChange={handleInputPhone}
                                required
                            />
                            {/* 
                            저희 웹페이지 이용하는데 id는 따로 안쓰고 이메일만 쓸 것 같아서 
                            이 부분 주석처리 하고 위에 formlabel 'ID'를 'Email'로 바꾸었습니다! -도원-
                            <FormLabel htmFor="for">이메일</FormLabel>
                            <IDContainer>
                                <FormInput
                                    type="email"
                                    value={inputEmail}
                                    onChange={handleInputEmail}
                                    required
                                />
                                <CheckButton>이메일 인증</CheckButton>
                            </IDContainer> */}
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
