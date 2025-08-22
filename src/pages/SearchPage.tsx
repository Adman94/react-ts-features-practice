import React, { useState, useEffect } from "react";
import SearchableDropDown from "../components/SearchableDropDown";
import { users } from "../../data/masterData.ts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // Make sure this path is correct
import type { User } from "../types.ts";
import "./SearchPage.css";

const SearchPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchableItems, setSearchableItems] = useState<User[] | []>([]);

  useEffect(() => {
    // Transform raw user data into the format expected by SearchableDropDown:
    // each item needs an 'id' and a 'label' for display,
    // and we spread the entire 'user' object so it's available when selected.
    const transformedUsers: User[] = users.map((user: User) => ({
      ...user, // Include all other properties of the user object
    }));
    setSearchableItems(transformedUsers);
  }, []);

  // Callback function to handle selection from the dropdown
  const handleUserSelect = (user: User) => {
    setSelectedUser(user); // Set the entire selected user object to state
    console.log("Selected user:", user);
  };

  return (
    <div>
      {/* Card for the searchable dropdown component */}
      <div>
        <SearchableDropDown
          items={searchableItems} // Pass the transformed user data
          onSelect={handleUserSelect} // Pass the handler for selection
          placeholder="Search for a user..." // Custom placeholder text
        />
      </div>

      {/* Display area for the selected user's JSON */}
      {selectedUser && (
        <div className="w-full max-w-md bg-gray-800 text-green-400 rounded-xl shadow-lg p-6 border border-gray-700">
          <p className="json-section">
            Everything about{" "}
            <p className="username">
              {selectedUser.firstName} {selectedUser.lastName}
            </p>
          </p>
          <div className="json-container max-h-48 overflow-y-auto">
            <SyntaxHighlighter language="json" style={dracula}>
              {JSON.stringify(selectedUser, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
