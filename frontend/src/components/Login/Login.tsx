import React, { useState } from "react";
import { login } from "../../utils/SessionManagement";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("jwtToken", "");
    localStorage.setItem("username", "");

    // Simple validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    try {
      const name = username;
      const response = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }), // Malpractice: I haven't hashed before sending. should change.
      });
      if (!response.ok) {
        setError("Authentication failed.");
        return;
      }

      // Extract JWT, and user role.
      const data = await response.json();

      login(username, data.token, data.isAdmin);
      // Redirect to "/newText"
      window.location.href = "/newText";
      console.log("Logged in with:", { username, password });
    } catch (err) {
      console.error(JSON.stringify(err));
      setError("Authentication failed.");
    }
  };

  return (
    <div className="login-container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group mb-3">
          {/* <label htmlFor="username">Username:</label> */}
          <input
            className="form-control"
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="input-group mb-3">
          {/* <label htmlFor="password">Password:</label> */}
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
