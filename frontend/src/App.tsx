import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import AddText from "./components/Text/AddText";
import TextList from "./components/Text/Texts";
import FeedbackList from "./components/Feedback/Feedbacks";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/newText" element={<AddText />} />
            <Route path="/texts" element={<TextList />} />
            <Route path="/feedbacks" element={<FeedbackList />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
