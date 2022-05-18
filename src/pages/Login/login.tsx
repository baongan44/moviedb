import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiCall, routes } from "../../utils";
import "./login.scss";

const Login = () => {
  const [requestToken, setRequestToken] = useState(null as any);
  const [userName, setUserName] = useState(null as any);
  const [passWord, setPassWord] = useState(null as any);
  const [error, setError] = useState(false);
  const history = useHistory();
  const account = {
    userName: "ntbngan",
    passWord: "milen2604",
  };
  const handleChangeName = (event: any) => {
    setUserName(event.target.value);
  };
  const handleChangePass = (event: any) => {
    setPassWord(event.target.value);
  };
  const getRequestToken = useCallback(async () => {
    const request = await apiCall("authentication/token/new", "GET");
    setRequestToken(request?.request_token);
  }, []);

  useEffect(() => {
    getRequestToken();
  }, [getRequestToken]);

  const handleLogin = async () => {
    if (userName === account.userName && passWord === account.passWord) {
      const loginAccess = {
        username: userName,
        password: passWord,
        request_token: requestToken,
      };
      await apiCall(
        "authentication/token/validate_with_login",
        "POST",
        loginAccess
      );
      const data = {
        request_token: requestToken,
      };
      const session = await apiCall("authentication/session/new", "POST", data);
      localStorage.setItem("login", "CONNECTED");
      localStorage.setItem("session_id", session.session_id);
      history.push(routes.home);
    } else {
      setError(true);
    }
  };
  return (
    <div className="login">
      <div className="login-image"></div>
      <div className="login-content">
        <div className="login-title">Login</div>
        {error && (
          <div className="login-error">Username or password incorrect</div>
        )}
        <div className="login-authen">
          <input
            type="text"
            placeholder="UserName"
            onChange={(e) => handleChangeName(e)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChangePass(e)}
          />
        </div>
        <div className="login-btn">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
