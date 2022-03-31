import { Route, Redirect } from "react-router-dom";

const IsLoginRouter = (props) => {
  if (localStorage.getItem("chatLogin") === "true") {
    return <Redirect to="/" />;
  } else {
    return <Route {...props} />;
  }
};

export default IsLoginRouter;
