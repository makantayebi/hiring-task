import { isAdmin, isLoggedIn, logout } from "../../utils/SessionManagement";
import Web3 from "web3";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [ethBalance, setEthBalance] = useState<bigint | null>();
  useEffect(() => {
    const loadData = async () => {
      const balance = await getEthBalance();
      setEthBalance(balance);
    };

    loadData();
  }, []);
  const getEthBalance = async (): Promise<bigint | null> => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log("Connected account:", accounts[0]);
        const walletAddress = accounts[0];
        const balance = await web3.eth.getBalance(walletAddress as string);
        console.log("balance is: " + balance);
        return balance;
      } catch (error) {
        console.log("User denied Metamask access.");
      }
    } else {
      console.error("MetaMask is not installed.");
    }
    return null;
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li className="nav-item">
                <a href="/feedbacks" className="nav-link">
                  See Feedbacks (Admins only)
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link">
                Wallet:
                {ethBalance !== null
                  ? " " + ethBalance + " ETH"
                  : " Not fetched"}
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
