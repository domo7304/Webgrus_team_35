import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages';
import LoginPage from './pages/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={LoginPage} exact/>
      </Switch>
    </Router>
  );
}

export default App;
