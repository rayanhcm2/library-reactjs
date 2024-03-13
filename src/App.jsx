import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddBooks from "./containers/AddBooks";
import SearchBooks from "./containers/SearchBooks";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddBooks />} />
        <Route path="/search" element={<SearchBooks />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
