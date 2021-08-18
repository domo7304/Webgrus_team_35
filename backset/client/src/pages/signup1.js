import React from 'react'

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
    IDContainer
} from './signElement'

const SignUp1 = () => {
    return (
        <>
            <Container1>
                <FormWrap>
                    <Icon to="/">Study Joa</Icon>
                    <FormContent>
                        <Form action="#">
                          <FormH1>회원 가입</FormH1>
                          <FormLabel htmFor='for'>ID</FormLabel>
                          <IDContainer>
                          <FormInput type='ID' required/>
                          <CheckButton>중복확인</CheckButton>
                          </IDContainer>
                          <FormLabel htmFor='for'>PW</FormLabel>
                          <FormInput type='PW' required/>
                          <FormLabel htmFor='for'>PW 확인</FormLabel>
                          <FormInput type='PW_re' required/>
                          <FormLabel htmFor='for'>휴대폰 번호</FormLabel>
                          <FormInput type='phone' required/>
                          <FormLabel htmFor='for'>이메일</FormLabel>
                          <IDContainer>
                          
                          <FormInput type='email' required/>
                          <CheckButton>이메일 인증</CheckButton>
                          </IDContainer>
                          <FormLabel htmFor='for'>이름</FormLabel>
                          <FormInput type='name' required/>
                          <FormButton type='submit'>회원가입</FormButton>
                          <TextContainer justify-content="flex-end">
                          <Text to="login" >이미 계정이 있나요? 로그인 하세요</Text>
                          </TextContainer>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container1>

        </>
    )
}

export default SignUp1
