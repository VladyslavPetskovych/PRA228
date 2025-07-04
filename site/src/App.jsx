import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utils/header/header";
import Home from "./components/pages/home";
import Book from "./components/pages/book";

function App() {
  return (
    <Router>
      <div className="bg-white font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
