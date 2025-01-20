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
      <h1 className="mt-5 mb-4">All Feedbacks</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && feedbacks.length === 0 && (
        <p>No Feedbacks found.</p>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Original Rating</th>
            <th scope="col">Sentiment</th>
            <th scope="col">User Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr>
              <td>{feedback.originalText}</td>
              <td>{feedback.sentiment}</td>
              <td>{feedback.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FeedbackList;
