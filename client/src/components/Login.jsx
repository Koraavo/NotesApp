import axios from "axios";
import React, { useState } from "react";
/* 
Check if the user is logged in or not?
the default userState and then the change in userstate
*/ 

/* 
The user needs to either register/login
The registration requires a name, email and a password
The login requires an email and a password

*/ 

export const Login = ({ setIsLogin }) => {
  // default user state is no name, email and password
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  // get the value as soon as it changes and set it to the values given by the user
  const onChangeInput = (e) => {
    // destructuring the information as key and value
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  // submit the register form
  // the backend has the register form on the local port of 5000
  // Axios(A sync api) is being used to post the data for registration
  
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  // submit the login form
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      // saving the token as tokenstore form res.data.token
      localStorage.setItem("tokenStore", res.data.token);
      // if user and email are correctly derived, set the login to true
      // authorise the user
      setIsLogin(true);
    } catch (error) {
      error.response.data.msg && setErr(error.response.data.msg);
    }
  };

  // JSX Code with value and onchange inputs
  return (
    <div className="body">
      <section className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form onSubmit={registerSubmit}>
            <label htmlFor="chk" aria-hidden="true"> Sign up </label>
            <input type="text" name="name" id="register-name" placeholder="Name" required
            // value is '', and it will change to the user's input
              value={user.name}
              onChange={onChangeInput}
            />
            <input type="email" name="email" id="register-email" placeholder="Email" required
              value={user.email}
              onChange={onChangeInput}
            />
            <input type="password" name="password" id="register-password" placeholder="Password" required
              autoComplete="true"
              value={user.password}
              onChange={onChangeInput}
            />
            <button type="submit" className="login-page-btn"> Register </button>
            <p> 
              You have an account?
              <label className="login-now" htmlFor="chk"> Login Now </label>
            </p>
            <h4>{err}</h4>
          </form>
        </div>

        <div className="login">
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <form onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Password"
              required
              autoComplete="true"
              value={user.password}
              onChange={onChangeInput}
            />
            <button type="submit" className="login-page-btn">
              Login
            </button>
            <p>
              You don't have an account?
              <label className="register-now" htmlFor="chk">
                Register Now
              </label>
            </p>
            <h4>{err}</h4>
          </form>
        </div>
      </section>
    </div>
  );
};
