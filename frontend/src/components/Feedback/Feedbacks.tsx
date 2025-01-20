import React, { useState, useEffect } from "react";

interface Feedback {
  id: number;
  content: string;
  originalText: string;
  sentiment: string;
}
const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      console.log("running fetch feedbacks.");
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8000/api/feedback/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        if (!response.ok) {
          setError("Action failed.");
          return;
        }
        console.log("response ok");
        const data: Feedback[] = await response.json();
        console.log(JSON.stringify(data));
        setFeedbacks(data);
      } catch (err) {
        console.log(JSON.stringify(err));
        setError("err");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h1>All Feedbacks</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && feedbacks.length === 0 && (
        <p>No Feedbacks found.</p>
      )}
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <span>user feedback: {feedback.content}</span>
            <br></br>
            <span>original text: {feedback.originalText}</span>
            <br></br>
            <span>Sentiment: {feedback.sentiment}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FeedbackList;
