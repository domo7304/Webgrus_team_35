import React, { Component } from "react";
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import MypageForm from "./MypageForm";
import { Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

class Body extends Component {
  render() {
    let resultForm;
    function getResultForm() {
      // console.log($.cookie("login_id"));
      if ($.cookie("login_id")) {//쿠키 존재시 BoardForm, 즉 게시판으로 바로 넘어간다. component에 들어있는 값을 호출한다고 보면 되는 것.
        resultForm = <Route exact path="/board" component={BoardForm}></Route>;
        //main url에 있는 다른 페이지들이 딸려나오지 않도록 "/"처리해준다.
        return resultForm;
      } else { //쿠키가 존재하지 않으면, LoginForm으로 가게 된다. react이므로 각 js파일에 스타일이 적용되어있어 별도의 css파일이 존재하지 않음을 기억하자.
        resultForm = <Route exact path="/board" component={LoginForm}></Route>;
        return resultForm;
      }
    }
    getResultForm();
    return (
      <div>
        <Route path="/mypage" component={MypageForm}></Route>
        <Route path="/boardWrite" component={BoardWriteForm}></Route>
        <Route path="/board/detail" component={BoardDetail}></Route>
        {resultForm}
      </div>
    );
  }
}

export default Body;
