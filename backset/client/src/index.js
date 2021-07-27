import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//index.js에 bootstrap import 필수. index.js는 실질적인 렌더링을 맡기 때문이다.
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import BookingForm from "./BookingForm";
import App from "./App";
// 일반적으로 <div>tag로 rendor를 감싼다

ReactDOM.render(<App />, document.getElementById("root"));
//한 페이지 안에 아래의 컴포넌트 모두를 저장해놓고, 아래 요소들을 조건에 맞춰 보여주게된다. 단, 조건이 없는 상황일 때에는 순차적 렌더링 게시
/*ReactDOM.render(
  <HashRouter> 
    <Header/>
    <Body/>
    <Footer/>
  </HashRouter>,
  document.querySelector("#container")
 
);*/
//header.js, body.js, footer.js로부터 렌더링을 받는다.
