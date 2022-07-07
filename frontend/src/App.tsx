import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LP from "./LP";
import Stats from "./Stats";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LP />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
