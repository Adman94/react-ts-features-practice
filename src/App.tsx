import "./styles/App.css"; // Keep for global styles or if you have any custom CSS not covered by Tailwind
import SearchPage from "./pages/SearchPage.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Counter from "./features/counter/Counter.tsx";

// Define the User interface with all explicit properties from your user data structure

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculator" element={<Counter />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
