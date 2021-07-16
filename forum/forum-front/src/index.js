import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
//index.js에 bootstrap import 필수. index.js는 실질적인 렌더링을 맡기 때문이다.
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
// 일반적으로 <div>tag로 rendor를 감싼다
ReactDOM.render(//한 페이지 안에 모든 것이 저장되어있는데, 아래 요소들을 부분적으로 보여주게 된다.
  <HashRouter> 
    <Header/>
    <Body/>
    <Footer/>
  </HashRouter>,
  document.querySelector("#container")
);
//header.js, body.js, footer.js로부터 렌더링을 받는다.
