import { useState } from "react";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState({});

  const getUserProfile = () => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((res) => res.json())
      .then((result) => setUserData({ ...result }));
  };

  const handleTextChange = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const handleSearch = () => {
    getUserProfile();
  };

  return (
    <div className="App container">
      <h1> Github Profile Finder</h1>

      <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          onChange={handleTextChange}
          placeholder="Search..."
        />
        <button className="default-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="profile-container">
        {userData.name ? (
          <>
            <img src={userData.avatar_url} alt="profile-picture" />
            <section>
              <p>
                <span>Name</span>: {userData.name}
              </p>
              <p>
                <span>Company</span>: {userData.company}
              </p>
              <p>
                <span>Address</span>: {userData.location}
              </p>
              <p>
                <span>Bio</span>: {userData.bio}
              </p>
              <p>
                <span>Blog</span>: {userData.blog}
              </p>
            </section>
          </>
        ) : (
          <p> User not found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
