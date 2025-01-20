import React from "react";
import { isAdmin, isLoggedIn, logout } from "../../utils/SessionManagement";

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
            {isLoggedIn() ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hello {localStorage.getItem("username")}!
                  </span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-disabled="true" href="/newText">
                    Add Rating
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-disabled="true" href="/texts">
                    My Ratings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-link"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a href="/login" className="nav-link">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/signup" className="nav-link">
                    Signup
                  </a>
                </li>
              </>
            )}
            {isAdmin() && (
              <>
                <li className="nav-item">
                  <a href="/feedbacks" className="nav-link">
                    See Feedbacks (Admins only)
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
