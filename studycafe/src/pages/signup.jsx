import React from "react";
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
import { Container1, FormWrap, Icon, Wrap } from "./signElement";
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    return (
        <Container1>
        
        <Icon to="/">Study Joa</Icon>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="ID"
                                label="ID"
                                name="ID"
                                autoComplete="ID"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                ID 중복확인
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="PW"
                                type="password"
                                id="PW"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password_re"
                                label="PW 확인"
                                type="password"
                                id="PW_re"
                                autoComplete="name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="phone"
                                label="휴대폰 번호"
                                id="phone"
                                autoComplete="phone"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                name="email"
                                label="이메일"
                                id="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                이메일 인증
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="birth_yr"
                                label="생년월일 - 년"
                                id="birth_yr"
                                autoComplete="birth_yr"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="birth_month"
                                label="월"
                                id="birth_month"
                                autoComplete="birth_month"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="birth_day"
                                label="일"
                                id="birth_day"
                                autoComplete="birth_day"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="개인정보 수집 및 활용에 동의합니다."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        회원가입
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있나요? 로그인하세요
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}></Box>
        </Container>
        </Container1>
    );
}
