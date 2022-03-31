import { Route, Redirect } from "react-router-dom";

const PageRouter = (props) => {
  if (
    localStorage.getItem("chatLogin") === "false" ||
    !localStorage.getItem("chatLogin")
  ) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
};

export default PageRouter;
