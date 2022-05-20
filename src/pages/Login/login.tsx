import { useFormik } from "formik";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { apiCall, routes } from "../../utils";
import "./login.scss";
import { validationSchema } from "./validate";

const Login = () => {
  const [requestToken, setRequestToken] = useState(null as any);
  const history = useHistory();
  const account = {
    userName: "ntbngan",
    passWord: "milen2604",
  };

  const getRequestToken = useCallback(async () => {
    const request = await apiCall("authentication/token/new", "GET");
    setRequestToken(request?.request_token);
  }, []);

  useEffect(() => {
    getRequestToken();
  }, [getRequestToken]);

  const formik = useFormik({
    initialValues: {
      userName: "",
      passWord: "",
    },
    validate: async (values) => {
      const newCreateProjectSchema = validationSchema(values);
      const errors = {};
      try {
        await newCreateProjectSchema.validate(values, {
          abortEarly: false,
        });
      } catch (validationError: any) {
        _.each(validationError.inner, (error) => {
          _.set(errors, `${error.path}`, error.message);
        });
        return errors;
      }
    },
    onSubmit: (values) => {
      // eslint-disable-next-line
      console.log({ values });
    },
  });
  const {
    handleChange,
    values: formValues,
    errors,
    submitCount,
    handleSubmit,
  } = formik;

  const handleLogin = async () => {
    handleSubmit();
    if (formValues.userName === account.userName && formValues.passWord === account.passWord) {
      const loginAccess = {
        username: formValues.userName ,
        password: formValues.passWord,
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
      toast.error("Your account are incorrect, please checkout again", {
        position: "top-right",
        autoClose: 5000,
        draggablePercent: 60,
      });
    }
  };
  return (
    <div className="login">
      <ToastContainer />
      <div className="login-image"></div>
      <div className="login-content">
        <div className="login-title">Login</div>
        <div className="login-authen">
          <input
            type="text"
            value={formValues.userName}
            name="userName"
            onChange={handleChange("userName")}
            placeholder="Enter your username"
            required
          />
          {errors && <ErrorMessage>{submitCount ? errors.userName : ""}</ErrorMessage>}
          <input
            value={formValues.passWord}
            name="passWord"
            onChange={handleChange("passWord")}
            required
            type="password"
            placeholder="Enter your password"
          />
          {errors && <ErrorMessage>{submitCount ? errors.passWord : ""}</ErrorMessage>}
        </div>
        <div className="login-btn">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
