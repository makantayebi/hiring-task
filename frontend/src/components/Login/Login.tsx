import React, { useState } from "react";

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
        body: JSON.stringify({ name, password }), // Malpractice: do not send password unhashed in the real world.
      });

      if (!response.ok) {
        setError("Authentication failed.");
        return;
      }
      // Extract JWT
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("username", username);

      console.log("Logged in with:", { username, password });
      alert("Login successful!");
    } catch (err) {
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
