import "./styles/App.css"; // Keep for global styles or if you have any custom CSS not covered by Tailwind
import SearchPage from "./pages/SearchPage.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";

// Define the User interface with all explicit properties from your user data structure

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
