import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utils/header/header";
import Footer from "./components/utils/footer";
import Home from "./pages/home";
import Book from "./pages/book";
import Contacts from "./pages/contacts";
import { Provider } from "react-redux";
import store from "./redux/store";
import ShortTermRent from "./pages/shortTermRent";
import LongTermRent from "./pages/longTermRent";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="bg-white font-sans flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/short-term-rent" element={<ShortTermRent />} />
              <Route path="/long-term-rent" element={<LongTermRent />} />
              <Route path="/book" element={<Book />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
