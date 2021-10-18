import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { NavBar } from "./components/NavBar/NavBar"

function App() {
  const token = localStorage.getItem("token")

  return (
    <div id="app" className="min-vh-100 ">
      <BrowserRouter>
        <NavBar token={token}></NavBar>
        {token ? <Redirect to="/"></Redirect> : <Redirect to="/login"></Redirect>}
        <Switch>
          <Route path="/login" component={Login} ></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
