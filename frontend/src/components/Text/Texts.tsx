import React, { useState, useEffect } from "react";

interface Text {
  id: number;
  text: string;
  sentiment: string;
}

const TextList: React.FC = () => {
  const [texts, setTexts] = useState<Text[]>([]);
  const [feedbacks, setFeedbacks] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTexts = async () => {
      setLoading(true);
      setError(null);
      console.log("fetching all texts");
      try {
        const response = await fetch("http://localhost:8000/api/text/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        console.log("checking response" + JSON.stringify(response));

        if (!response.ok) {
          setError("Action failed.");
          return;
        }
        console.log("response ok");

        console.log(JSON.stringify(response));
        const data: Text[] = await response.json();
        setTexts(data);
      } catch (err) {
        console.log(JSON.stringify(err));
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, []);

  const handleFeedbackSubmit = async (textId: number) => {
    const feedback = feedbacks[textId];
    if (!feedback) {
      setError("Please enter feedback before submitting.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/feedback/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({ textId, feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setFeedbacks((prev) => ({ ...prev, [textId]: "" })); // Clear feedback field
    } catch (err) {
      console.log(JSON.stringify(err));
      setError("err");
    }
  };

  // Handle feedback change
  const handleFeedbackChange = (textId: number, value: string) => {
    setFeedbacks((prev) => ({ ...prev, [textId]: value }));
  };

  return (
    <div className="mt-5">
      <h1 className="mb-4">My Ratings</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && texts.length === 0 && <p>No Texts found.</p>}

      <ul>
        {texts.map((text) => (
          <li key={text.id} className="list-group-item mb-5">
            <span>
              <strong>{text.text}</strong>
              <br></br>
              Sentiment: ({text.sentiment})
            </span>
            <input
              className="form-control"
              maxLength={144}
              placeholder="What do you think about the calculated sentiment?"
              value={feedbacks[text.id] || ""}
              onChange={(e) => handleFeedbackChange(text.id, e.target.value)}
            />
            <button
              onClick={() => handleFeedbackSubmit(text.id)}
              className="btn btn-primary mt-2"
            >
              Send Feedback
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextList;
