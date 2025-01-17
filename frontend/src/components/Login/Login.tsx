import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    console.log("Logged in with:", { username, password });
    setError("");
    alert("Login successful!");
  };

  return (
    <div className="login-container mt-5">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
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
      </form>
    </div>
  );
};

export default Login;
