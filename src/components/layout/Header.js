import React, { useContext } from "react";
import Link from "next/Link";
import Image from "next/Image";

import AuthContext from "../../../context/AuthContext";

const Header = () => {
  const { loading, user,logout } = useContext(AuthContext);
  
  const logoutHandler=()=>{
    logout()
  }


  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="btn dropdown-ml-3">
              <a
                href=""
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/employer/jobs">
                  <a className="dropdown-item">My Jobs</a>
                </Link>

                <Link href="/me/applied">
                  <a className="dropdown-item">Jobs Applied</a>
                </Link>

                <Link href="/me">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/upload/resume">
                  <a className="dropdown-item">Upload Resume</a>
                </Link>

                <Link href="/">
                  <a className="dropdown-item text-danger" onClick={logoutHandler}>Logout</a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
