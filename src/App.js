import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/auth/login";
import Page from "./components/mainPage/page";
import IsLoginRouter from "./components/protectedRouter/isLoginRouter";
import PageRouter from "./components/protectedRouter/PageRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

function App() {
  return (
    <Router>
      <Switch>
        <IsLoginRouter component={Login} path="/login" exact />
        <PageRouter component={Page} path="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
