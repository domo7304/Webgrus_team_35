import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
//form과 button component만을 import해서 사용한다
import axios from "axios";
//비동기 통신
import $ from "jquery";
import {} from "jquery.cookie";
//로그인처리와 로그아웃 처리를 위해 쿠키를 활용함
//쿠키 값이 있다는 것은 이미 로그인 처리가 되어있는 것이고, 쿠키값이 없다는 것은 로그인이 안되어 있다는 것
axios.defaults.withCredentials = true; //다른 서버에서 데이터를 가져오기 위해 사용. 동일 기원이 아님에도 데이터 통신 가능케 함
const headers = { withCredentials: true };

class LoginForm extends Component {

  join = () => { //파
    const joinEmail = this.joinEmail.value;
    const joinName = this.joinName.value;
    const joinPw = this.joinPw.value;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //js문법의 정규표현식으로, 이메일 주소를 추출하기 위한 방법이다.
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (joinEmail === "" || joinEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      this.joinEmail.focus();
      return;
    } else if (
      joinEmail.match(regExp) === null ||
      joinEmail.match(regExp) === undefined
    ) {
      alert("이메일 형식에 맞게 입력해주세요.");
      this.joinEmail.value = "";
      this.joinEmail.focus();
      return;
    } else if (joinName === "" || joinName === undefined) {
      alert("이름을 입력해주세요.");
      this.joinName.focus();
      return;
    } else if (joinPw === "" || joinPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      this.joinPw.focus();
      return;
    } else if (
      joinPw.match(regExp2) === null ||
      joinPw.match(regExp2) === undefined
    ) {
      alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
      this.joinPw.value = "";
      this.joinPw.focus();
      return;
    }
    //파라미터를 모아놓은 변수. 이들을 서버에 전송하게 된다. headers는 다른 서버와의 통신을 위해 넘겨주어야 하는 것
    const send_param = { //key와 value의 조합
      headers,
      email: this.joinEmail.value,//프론트에 입력한 이메일 값
      name: this.joinName.value,//프론트에 입력한 이름
      password: this.joinPw.value//프론트에 입력한 비밀번호 값
    };
    axios //axios를 이용한 통신
      .post("http://localhost:8080/member/join", send_param) //send_param을 local 8080번에 전송, 페이지 전송 없이 비동기적 기능
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          //이메일 중복 체크
          if (returnData.data.dupYn === "1") {
            this.joinEmail.value = "";
            this.joinEmail.focus();
          } else {
            this.joinEmail.value = "";
            this.joinName.value = "";
            this.joinPw.value = "";
          }
        } else {
          alert("회원가입 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  login = () => {//로그인 함수
    const loginEmail = this.loginEmail.value;
    const loginPw = this.loginPw.value;

    if (loginEmail === "" || loginEmail === undefined) {
      alert("이메일 주소를 입력해주세요.");
      this.loginEmail.focus();
      return;
    } else if (loginPw === "" || loginPw === undefined) {
      alert("비밀번호를 입력해주세요.");
      this.loginPw.focus();
      return;
    }

    const send_param = {
      headers,
      email: this.loginEmail.value,
      password: this.loginPw.value
    };
    axios
      .post("http://localhost:8080/member/login", send_param)//서버에 member/login이라는 url 정보를 전송해줌
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          // console.log("login_id:" + returnData.data._id);
          $.cookie("login_id", returnData.data._id, { expires: 1 });//서버에 연동이 성공하면, 받아온 데이터의 id를 login-id쿠키로 쓴다.
          $.cookie("login_email", returnData.data.email, { expires: 1 });
          alert(returnData.data.message);//로그인되면 메시지 띄워줌
          window.location.reload();//페이지가 정적이게 가만히 있으면 로그인을 한다한들 페이지가 넘어가지 않음
        } else {
          alert(returnData.data.message);//로그인 실패시 출력할 메시지를 입력하면 될 것
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const formStyle = {
      margin: 50
    };
    const buttonStyle = {
      marginTop: 10
    };//렌더 안에서 스타일을 적용하는 이유는 외부에서 자바스크립트 문법을 사용하기 위함
    return (
      <Form style={formStyle}>
        <Form.Group controlId="joinForm">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            maxLength="100"
            ref={ref => (this.joinEmail = ref)}
            //react에서 아이디를 부여하는 방법이라고 배움. 여기서 받은 아이디를 서버로 넘기게 됨
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            작성해주신 이메일 주소는 외부에 유출되지 않습니다.
          </Form.Text>
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            maxLength="20"
            ref={ref => (this.joinName = ref)}
            placeholder="name"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            maxLength="64"
            ref={ref => (this.joinPw = ref)}
            placeholder="Password"
          />
          <Button
            style={buttonStyle}
            onClick={this.join} //로그인 폼 클래스 내부의 join함수를 클릭할 때마다 실행
            variant="primary" //bootstrap 문법.
            type="button"
            block //block은 화면 끝까지 디자인을 채우는 것
          >
            회원가입
          </Button>
        </Form.Group>

        <Form.Group controlId="loginForm">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            maxLength="100"
            ref={ref => (this.loginEmail = ref)}
            placeholder="Enter email"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            maxLength="20"
            ref={ref => (this.loginPw = ref)}
            placeholder="Password"
          />
          <Button
            style={buttonStyle}
            onClick={this.login}
            variant="primary"
            type="button"
            block
          >
            로그인
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default LoginForm;
