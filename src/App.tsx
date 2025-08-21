import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchableDropDown from "./components/SearchableDropDown";

interface SelectedEvent {
  id: string | number;
  label: string;
}

const events = [
  {
    id: 1,
    label: "Super Bowl",
  },
  {
    id: 2,
    label: "Radiohead",
  },
  {
    id: 3,
    label: "Coldplay",
  },
];

function App() {
  // const [count, setCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(
    null
  );

  const handleEventSelect = (event: SelectedEvent) => {
    setSelectedEvent(event);
    console.log("Selected event:", event);
    // You can perform other actions here, like updating a form field or fetching data
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TypeScript React Features Practice</h1>

      <div className="card">
        <h2>Searchable Dropdown Component</h2>
        <SearchableDropDown items={events} onSelect={handleEventSelect} />
        {selectedEvent && (
          <div style={{ marginTop: "20px" }}>
            <h3>Selected Event:</h3>
            <p>ID: {selectedEvent.id}</p>
            <p>Label: {selectedEvent.label}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
