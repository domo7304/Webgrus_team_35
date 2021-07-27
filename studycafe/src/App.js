import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages";
import SignPage from "./pages/signup";
import LoginPage from "./pages/login";
import findID from "./pages/findid";
import findPW from "./pages/findpw";
import MessengerCustomerChat from "react-messenger-customer-chat";
import customer from "./components/Customer/customer";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/signup" exact component={SignPage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/findid" exact component={findID} />
                    <Route path="/findpw" exact component={findPW} />
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
