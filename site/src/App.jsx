import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/utils/header/header";
import Footer from "./components/utils/footer";
import Home from "./pages/home";
import Book from "./pages/book";
import Contacts from "./pages/contacts";
import ShortTermRent from "./pages/shortTermRent";
import ShortTermRentDetail from "./components/shortTermRent/ShortTermRentDetail";
import LongTermRent from "./pages/longTermRent";
import LongTermRentDetail from "./components/longTermRent/LongTermRentDetail";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";

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
              <Route
                path="/short-term-rent/:id"
                element={<ShortTermRentDetail />}
              />

              <Route path="/long-term-rent" element={<LongTermRent />} />
              <Route
                path="/long-term-rent/:id"
                element={<LongTermRentDetail />}
              />
              <Route path="/book" element={<Book />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
