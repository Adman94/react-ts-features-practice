import React, { useState } from "react";
import SearchableDropDown from "../components/SearchableDropDown";
import { users, posts } from "../../data/masterData.ts";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { User, Post } from "../types.ts";
import "../styles/SearchPage.css";
import UserDetail from "../components/UserDetail.tsx";

const SearchPage: React.FC = () => {
  const customPreStyle = {
    margin: "0",
  };
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSelectedPost(null);
    console.log("Selected user:", user);
  };
  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    setSelectedUser(null);
    console.log("Selected post:", post);
  };

  return (
    <div>
      <div>
        <SearchableDropDown
          users={users}
          posts={posts}
          onUserSelect={handleUserSelect}
          onPostSelect={handlePostSelect}
          selectedUser={selectedUser}
          selectedPost={selectedPost}
        />
      </div>
      <div className="output-container">
        {selectedUser && (
          <div className="user-section">
            <div className="userinfo">
              NAME
              <div className="infoStyle">
                {selectedUser.firstName} {selectedUser.lastName}
              </div>
            </div>
            <UserDetail title="Age" info={selectedUser.age} />
            <UserDetail title="Gender" info={selectedUser.gender} />
            <div className="json-user-container max-h-48 overflow-y-auto">
              <SyntaxHighlighter
                language="json"
                style={dracula}
                lineProps={{
                  style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                }}
                wrapLines={true}
                customStyle={customPreStyle}
              >
                {JSON.stringify(selectedUser, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {selectedPost && (
          <div className="post-section">
            <div className="postTitleBody">
              <h2 className="postTitle">{selectedPost.title}</h2>
              <div className="postBody">
                <p>{selectedPost.body}</p>
              </div>
            </div>

            <div className="json-post-container max-h-48 overflow-y-auto">
              <SyntaxHighlighter
                language="json"
                style={dracula}
                lineProps={{
                  style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                }}
                wrapLines={true}
                customStyle={customPreStyle}
              >
                {JSON.stringify(selectedPost, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
