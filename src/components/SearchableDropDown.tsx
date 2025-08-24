import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/SearchableDropDown.css";
import type { User, Post } from "../types.ts";

interface SearchableDropDownProps {
  users: User[];
  posts: Post[];
  onUserSelect: (item: User) => void;
  onPostSelect: (item: Post) => void;
  placeholder?: string;
  selectedUser: User | null;
  selectedPost: Post | null;
}

const SearchableDropDown: React.FC<SearchableDropDownProps> = ({
  users,
  posts,
  onUserSelect,
  onPostSelect,
  selectedUser,
  selectedPost,
}) => {
  const [userQuery, setUserQuery] = useState("");
  const [postQuery, setPostQuery] = useState("");
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [highlightedUserIndex, setHighlightedUserIndex] = useState(-1);
  const [highlightedPostIndex, setHighlightedPostIndex] = useState(-1);
  const dropdownUserRef = useRef<HTMLDivElement>(null);
  const dropdownPostRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const postInputRef = useRef<HTMLInputElement>(null);

  // Filter users based on query, ensuring the selected user is NOT in this list
  const filteredUsers = useMemo(() => {
    const currentQueryLower = userQuery.toLowerCase();
    const selectedUserNameLower = selectedUser
      ? `${selectedUser.firstName} ${selectedUser.lastName}`.toLowerCase()
      : "";

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;
      const matchesQuery = fullName.toLowerCase().includes(currentQueryLower);
      const isNotSelected = selectedUser ? user.id !== selectedUser.id : true;

      // Special condition: if the query is exactly the selected user's name
      // AND the dropdown is open, we want to show all other users in the filtered list
      // This allows them to be displayed after the selected user.
      if (
        selectedUser &&
        currentQueryLower === selectedUserNameLower &&
        isUserOpen
      ) {
        return isNotSelected; // Return true for all users EXCEPT the selected one
      }
      return matchesQuery && isNotSelected; // Standard filtering for other scenarios
    });
  }, [userQuery, users, selectedUser, isUserOpen]); // isUserOpen is a dependency to re-evaluate when dropdown state changes

  // Filter users based on query, ensuring the selected user is NOT in this list
  const filteredPosts = useMemo(() => {
    const currentQueryLower = postQuery.toLowerCase();
    const selectedPostTitleLower = selectedPost
      ? `${selectedPost.title}`.toLowerCase()
      : "";
    return posts.filter((post) => {
      const matchesQuery = post.title.toLowerCase().includes(currentQueryLower);
      const isNotSelected = selectedPost ? post.id !== selectedPost.id : true;

      // Special condition: if the query is exactly the selected user's name
      // AND the dropdown is open, we want to show all other users in the filtered list
      // This allows them to be displayed after the selected user.
      if (
        selectedPost &&
        currentQueryLower === selectedPostTitleLower &&
        isPostOpen
      ) {
        return isNotSelected; // Return true for all users EXCEPT the selected one
      }
      return matchesQuery && isNotSelected; // Standard filtering for other scenarios
    });
  }, [postQuery, posts, selectedPost, isPostOpen]); // isUserOpen is a dependency to re-evaluate when dropdown state changes

  useEffect(() => {
    if (isUserOpen) {
      setHighlightedUserIndex(selectedUser ? 0 : -1);
    }
  }, [isUserOpen, selectedUser]);

  useEffect(() => {
    if (isPostOpen) {
      setHighlightedPostIndex(selectedPost ? 0 : -1);
    }
  }, [isPostOpen, selectedPost]);

  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserQuery(event.target.value);
    setIsUserOpen(true);
  };

  const handlePostInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostQuery(event.target.value);
    setIsPostOpen(true);
  };

  const handleUserClick = (user: User) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    setUserQuery(fullName);
    setIsUserOpen(false);
    onUserSelect(user);
    setPostQuery("");
  };

  const handlePostClick = (post: Post) => {
    setPostQuery(post.title);
    setIsPostOpen(false);
    onPostSelect(post);
    setUserQuery("");
  };

  const handleUserKeyDown = (event: React.KeyboardEvent) => {
    let newIndex = highlightedUserIndex;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsUserOpen(true);
        newIndex =
          newIndex < filteredUsers.length - 1 ? newIndex + 1 : newIndex;
        break;
      case "ArrowUp":
        event.preventDefault();
        newIndex = newIndex > 0 ? newIndex - 1 : 0;
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedUserIndex !== -1) {
          handleUserClick(filteredUsers[highlightedUserIndex]);
        }
        break;
      case "Escape":
        setIsUserOpen(false);
        break;
      default:
        return;
    }
    setHighlightedUserIndex(newIndex);
  };

  const handlePostKeyDown = (event: React.KeyboardEvent) => {
    let newIndex = highlightedPostIndex;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setIsPostOpen(true);
        newIndex =
          newIndex < filteredPosts.length - 1 ? newIndex + 1 : newIndex;
        break;
      case "ArrowUp":
        event.preventDefault();
        newIndex = newIndex > 0 ? newIndex - 1 : 0;
        break;
      case "Enter":
        event.preventDefault();
        if (highlightedPostIndex !== -1) {
          handlePostClick(filteredPosts[highlightedPostIndex]);
        }
        break;
      case "Escape":
        setIsPostOpen(false);
        break;
      default:
        return;
    }
    setHighlightedPostIndex(newIndex);
  };

  const handleUserBlur = (e: React.FocusEvent) => {
    if (!dropdownUserRef.current?.contains(e.relatedTarget as Node)) {
      setIsUserOpen(false);
    }
  };

  const handlePostBlur = (e: React.FocusEvent) => {
    if (!dropdownPostRef.current?.contains(e.relatedTarget as Node)) {
      setIsPostOpen(false);
    }
  };

  return (
    <>
      <h2 className="title">"Searchable Dropdown Component"</h2>
      <div className="inputs">
        <div
          className="searchable-dd"
          ref={dropdownUserRef}
          onBlur={handleUserBlur}
          role="combobox"
          aria-expanded={isUserOpen}
          aria-haspopup="listbox"
        >
          <input
            className="input"
            ref={userInputRef}
            type="text"
            placeholder="Search for a user..."
            value={userQuery}
            onChange={handleUserInputChange}
            onFocus={() => setIsUserOpen(true)}
            onKeyDown={handleUserKeyDown}
            aria-autocomplete="list"
            aria-controls="dropdown-user-list"
          />
          {isUserOpen && (
            <ul
              className="dd-list"
              id="dropdown-user-list"
              role="listbox"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {selectedUser && (
                <li
                  key={selectedUser.id}
                  onMouseDown={() => handleUserClick(selectedUser)}
                  className={0 === highlightedUserIndex ? "highlighted" : ""}
                  role="option"
                  aria-selected={0 === highlightedUserIndex}
                >
                  {selectedUser.firstName} {selectedUser.lastName}
                </li>
              )}
              {filteredUsers.length > 0 ? (
                filteredUsers.map((item, index) => {
                  const fullName = `${item.firstName} ${item.lastName}`;
                  return (
                    <li
                      key={item.id}
                      onMouseDown={() => handleUserClick(item)}
                      className={
                        index + (selectedUser ? 1 : 0) === highlightedUserIndex
                          ? "highlighted"
                          : ""
                      }
                      role="option"
                      aria-selected={
                        index + (selectedUser ? 1 : 0) === highlightedUserIndex
                      }
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
        <div
          className="searchable-dd"
          ref={dropdownPostRef}
          onBlur={handlePostBlur}
          role="combobox"
          aria-expanded={isPostOpen}
          aria-haspopup="listbox"
        >
          <input
            className="input"
            ref={postInputRef}
            type="text"
            placeholder="Search for a post..."
            value={postQuery}
            onChange={handlePostInputChange}
            onFocus={() => setIsPostOpen(true)}
            onKeyDown={handlePostKeyDown}
            aria-autocomplete="list"
            aria-controls="dropdown-post-list"
          />
          {isPostOpen && (
            <ul
              className="dd-list"
              id="dropdown-post-list"
              role="listbox"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {selectedPost && (
                <li
                  key={selectedPost.id}
                  onMouseDown={() => handlePostClick(selectedPost)}
                  className={0 === highlightedPostIndex ? "highlighted" : ""}
                  role="option"
                  aria-selected={0 === highlightedPostIndex}
                >
                  {selectedPost.title}
                </li>
              )}
              {filteredPosts.length > 0 ? (
                filteredPosts.map((item, index) => {
                  return (
                    <li
                      key={item.id}
                      onMouseDown={() => handlePostClick(item)}
                      className={
                        index + (selectedPost ? 1 : 0) === highlightedPostIndex
                          ? "highlighted"
                          : ""
                      }
                      role="option"
                      aria-selected={
                        index + (selectedPost ? 1 : 0) === highlightedPostIndex
                      }
                    >
                      {item.title}
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
      </div>
    </>
  );
};

export default SearchableDropDown;
