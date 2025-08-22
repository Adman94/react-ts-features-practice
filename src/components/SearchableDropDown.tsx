import React, { useState, useRef, useEffect } from "react";
import "./SearchableDropDown.css";
import type { User } from "../types.ts";

interface SearchableDropDownProps {
  items: User[];
  onSelect: (item: User) => void;
  placeholder?: string;
}

const SearchableDropDown: React.FC<SearchableDropDownProps> = ({
  items,
  onSelect,
  placeholder = "Search...",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    return fullName.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsOpen(true);
  };

  const handleItemClick = (item: User) => {
    const fullName = `${item.firstName} ${item.lastName}`;
    setQuery(fullName);
    setIsOpen(false);
    onSelect(item);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedIndex !== -1) {
          handleItemClick(filteredItems[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="searchable-dd"
      ref={dropdownRef}
      onBlur={handleBlur}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <h2 className="title">"Searchable Dropdown Component"</h2>
      <input
        className="input"
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="dropdown-list"
      />
      {isOpen && (
        <ul
          className="dd-list"
          id="dropdown-list"
          role="listbox"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const fullName = `${item.firstName} ${item.lastName}`;
              return (
                <li
                  key={item.id}
                  onMouseDown={() => handleItemClick(item)}
                  className={index === highlightedIndex ? "highlighted" : ""}
                  role="option"
                  aria-selected={index === highlightedIndex}
                >
                  {fullName}
                </li>
              );
            })
          ) : (
            <li className="no-results" role="option">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropDown;
