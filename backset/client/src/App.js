import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SignPage from "./pages/signup";
import LoginPage from "./pages/login";
import findID from "./pages/findid";
import findPW from "./pages/findpw";
import MessengerCustomerChat from "react-messenger-customer-chat";
import SignIn from "./pages/singin";
import SignUp from "./pages/signup";
import FindId1 from "./pages/findid1";
import FindPW1 from "./pages/findpw1";
import SignUp1 from "./pages/signup1";
import BoardForm from "./BoardForm";
import Booking from "./components/Booking";
import Board from "./Board";
import MypageForm from "./MypageForm";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/signup" exact component={SignUp1} />
                    <Route path="/login" exact component={SignIn} />
                    <Route path="/findid" exact component={FindId1} />
                    <Route path="/findpw" exact component={FindPW1} />
                    <Route path="/board" exact component={Board} />
                    <Route path="/book" exact component={Booking} />
                    <Route path="/mypage" exact component={MypageForm} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
