import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/" className="nav-link">
                About
              </a>
            </li>
            {!(
              localStorage.getItem("username") &&
              localStorage.getItem("jwtToken")
            ) ? (
              <li className="nav-item">
                <a href="/signup" className="nav-link">
                  Signup
                </a>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              {localStorage.getItem("username") &&
              localStorage.getItem("jwtToken") ? (
                <span className="nav-link">
                  Hello {localStorage.getItem("username")}
                </span>
              ) : (
                <a href="/login" className="nav-link">
                  Login
                </a>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-disabled="true" href="/newText">
                Add Text
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-disabled="true" href="/texts/all">
                My texts
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
