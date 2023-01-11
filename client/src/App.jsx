/*
Axios is a promise-based HTTP Client for node.js and the browser.
Getting components created for login and notes
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Login } from "./components/Login";
import { Notes } from "./components/Notes";

import "./app.css";

export function App() {
  const [isLogin, setIsLogin] = useState(false);

  // the verification creates an auto logout depending on the time you have given for the token to expire
  // when you are logged in, the token and islogin is true
  // once the token expires, you are automatically logged out
  // as soon as the token is generated it is stored in the localstorage
  // The useeffect hook is only checking the verification the first time the user is on the page
  // This can be seen with the fact that there are no dependency-lists as the second argument
  // basically check the login by verifying the user
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("http://localhost:5000/users/verify", {
          headers: {
            Authorization: token,
          },
        });
        console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      } else {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="App">
      {/* if the user is loggedin, return the notes, else ask him to login */}
      {isLogin ? <Notes setIsLogin={setIsLogin} /> : <Login setIsLogin={setIsLogin} />}
    </div>
  );
}
