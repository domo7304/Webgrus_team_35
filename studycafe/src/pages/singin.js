import React from "react";
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
    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Sign in to your account</FormH1>
                            <FormLabel htmFor="for">ID</FormLabel>
                            <FormInput type="id" required />
                            <FormLabel htmFor="for">Password</FormLabel>
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
