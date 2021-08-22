import axios from "axios";
import React, { useState, useEffect } from "react";
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

const FindId1 = () => {
    const [inputName, setInputName] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const handleInputName = (e) => {
        setInputName(e.target.value);
    };
    const handleInputPhone = (e) => {
        setInputPhone(e.target.value);
    };

    const findId = async (e) => {
        e.preventDefault();
        const body = {
            name: inputName,
            phone: inputPhone,
        };
        fetch("/api/user/findUserEmail", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json()) //json으로 변환
            .then((data) => {
                console.log(data.email);
                alert(
                    "이메일 찾기 결과: " +
                        JSON.stringify(data.email).replace(/\"/gi, "")
                );
            })
            .catch((err) => {
                alert("등록되지 않은 회원입니다");
            });
    };

    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent onSubmit={findId}>
                        <Form>
                            <FormH1>이메일 찾기</FormH1>
                            <FormLabel htmFor="for">이름</FormLabel>
                            <FormInput
                                type="name"
                                value={inputName}
                                onChange={handleInputName}
                                required
                            />
                            <FormLabel htmFor="for">휴대폰 번호</FormLabel>
                            <FormInput
                                type="phone"
                                value={inputPhone}
                                onChange={handleInputPhone}
                                required
                            />
                            <FormButton type="submit">이메일 찾기</FormButton>
                            <TextContainer>
                                <Text to="findpw">비밀번호 찾기</Text>
                                <Text to="login">로그인 화면으로 이동</Text>
                            </TextContainer>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container1>
        </>
    );
};

export default FindId1;
