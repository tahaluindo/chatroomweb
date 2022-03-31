import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { onSignInSubmit, getUser, getAccount } from "../reducer/action";
import chat from "../img/chat.png";
import "../auth/style.css";

const Login = ({
  onSignInSubmit,
  errorLoginMessage,
  displayErrorLogin,
  loadingLogin,
  listUser,
  getUser,
  getAccount,
  myAccount,
}) => {
  if (!localStorage.getItem("chatLogin")) {
    localStorage.setItem("chatLogin", "false");
  }
  const [telp, setTelp] = useState("");
  const registerNum = (val) => {
    onSignInSubmit(val);
    // getAccount();
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div className="rootLogin">
      <img src={chat} alt="" />
      <p className="apkName">CHATLITE</p>
      <div id="recaptcha-container"></div>
      {localStorage.getItem("chatLogin") === "false" && (
        <div className="loginContent d-flex justify-content-center">
          <div class="form-floating">
            <input
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              type="phone"
              class="form-control"
              id="floatingInput"
            />

            <label for="floatingInput">Nomer telephone</label>
            {telp === "" && (
              <button className="btn btn-secondary">Submit</button>
            )}
            {loadingLogin === false &&
              telp !== "" &&
              displayErrorLogin === false && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    registerNum({
                      telp: telp,
                      users: listUser,
                    })
                  }
                >
                  Submit
                </button>
              )}
            {loadingLogin === true && telp !== "" && (
              <button className="btn btn-primary">
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            )}

            {displayErrorLogin === true && (
              <div class="alert alert-danger col-9" role="alert">
                {errorLoginMessage} <a href="/login">Try again</a>
              </div>
            )}
          </div>
        </div>
      )}
      {localStorage.getItem("chatLogin") === "true" && (
        <a
          href="/"
          className="loginBtn btn btn-primary col-2 position-absolute top-50 start-50 translate-middle"
        >
          Login
        </a>
      )}
    </div>
  );
};

const stateReducer = (state) => {
  return {
    dialNumber: state.dialNumber,
    errorLoginMessage: state.errorLoginMessage,
    displayErrorLogin: state.displayErrorLogin,
    loadingLogin: state.loadingLogin,
    listUser: state.listUser,
    myAccount: state.myAccount,
  };
};

const dispatchReducer = (dispatch) => ({
  onSignInSubmit: (data) => dispatch(onSignInSubmit(data)),
  getUser: () => dispatch(getUser()),
  getAccount: () => dispatch(getAccount()),
});

export default connect(stateReducer, dispatchReducer)(Login);
