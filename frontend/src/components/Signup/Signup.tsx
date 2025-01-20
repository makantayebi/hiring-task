import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    try {
      const name = username;
      const response = await fetch("http://localhost:8000/api/auth/signup", {
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
    } catch (err) {
      setError("Authentication failed.");
      return;
    }
    console.log("signed up in with:", { username, password });
    setError("");
    alert("Signup successful!");
  };

  return (
    <div className="login-container">
      <h1 className="mb-4 mt-5">Signup</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignup} className="login-form">
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
