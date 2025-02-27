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
    <>
      <h1 className="mt-5 mb-4">Sample product</h1>
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
          <button type="submit" className="btn btn-primary mt-1">
            Add rating
          </button>
        </div>
        {error && <p className="alert alert-danger">{error}</p>}
      </form>
    </>
  );
};
export default AddText;
