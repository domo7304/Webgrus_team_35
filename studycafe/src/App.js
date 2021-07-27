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
                </Switch>
            </Router>

            <MessengerCustomerChat
                pageId="111618531178432"
                appId="3052504145007305"
            />
        </div>
    );
}

export default App;
