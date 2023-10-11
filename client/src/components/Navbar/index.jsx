// import { useState } from "react";
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthAction from "../../store/actions/auth.action";

const NavBar = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  // console.log(currentUser, "user");
  // console.log(
  //   useSelector((state) => state.auth),
  //   "auth"
  // );

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(AuthAction.logout());
  }, [dispatch]);

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          ECOMOLALA
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
