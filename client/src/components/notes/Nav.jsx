import React from "react";
import { Link } from "react-router-dom";

/* 
The token is stored in local storage
Clear local storage as soon as user logs out, thus clearing authorization routes
*/ 
export const Nav = ({ setisLogin }) => {
  const logoutSubmit = () => {
    localStorage.clear();
    setisLogin(false);
  };

  /*
  Nav Links in the header has the main logo/home page
  There is a create note link and a logout link
  */ 

  return (
    <header className="page-header">
      <div className="logo">
        <h1>
          <Link to={"/"}>Notes</Link>
        </h1>
      </div>
      {/* <div>
        <Link to={"/"} onClick={logoutSubmit}> Logout </Link>
      </div> */}
      <ul className="nav-links">
        {/* <li>
          <Link to={"/"}>Home</Link>
        </li> */}
        <li>
          <Link to={"/create"}>Create Note</Link>
        </li>
        <li>
          <Link to={"/"} onClick={logoutSubmit}> Logout </Link>
        </li>
      </ul>
    </header>
  );
};
