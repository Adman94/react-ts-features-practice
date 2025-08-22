import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css"; // Keep for global styles or if you have any custom CSS not covered by Tailwind
import SearchPage from "./pages/SearchPage.tsx";
import Navbar from "./components/Navbar.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Define the User interface with all explicit properties from your user data structure

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        {/* Logos section, centered */}
        <div className="flex justify-center items-center mb-8">
          <a href="https://vite.dev" target="_blank" className="mr-4">
            <img src={viteLogo} className="h-16 w-16 logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img
              src={reactLogo}
              className="h-16 w-16 logo react"
              alt="React logo"
            />
          </a>
        </div>

        {/* Main title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          TypeScript React Features Practice
        </h1>
      </div>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
