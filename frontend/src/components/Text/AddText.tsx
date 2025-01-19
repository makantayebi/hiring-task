import { useState } from "react";

const AddText = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (text.length > 1000) {
      setError("Text cannot exceed 1000 characters.");
    } else {
      try {
        const response = await fetch("http://localhost:8000/api/text/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({ text }),
        });
        if (!response.ok) {
          setError("Action failed.");
          return;
        }
      } catch (err) {
        setError("Action failed.");
      }
      // Reset the form or handle submission logic
      setText("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
            placeholder="Enter your text..."
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </form>
  );
};
export default AddText;
