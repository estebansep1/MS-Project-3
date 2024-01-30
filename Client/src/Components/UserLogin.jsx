import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import _ from "lodash";
import "../Scss/UserLogin.scss";

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState("");
  const [pass, setAPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSetUser() {
    if (!user || !pass) {
      setErrorMessage("Username and password are required.");
      return;
    }

    const storedPassword = localStorage.getItem("password");

    if (pass !== storedPassword) {
      setErrorMessage("Incorrect password.");
      return;
    }

    localStorage.setItem("user", user);
    setUser(user);
    localStorage.setItem(
      "avatar",
      `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
    );
    setErrorMessage("");
  }

  function handleKeyPress(keyEvent) {
    if (keyEvent.key === "Enter") {
      handleSetUser();
    }
  }

  function handleRegistration() {
    const existingUser = localStorage.getItem(user);
    if (existingUser) {
      setErrorMessage("Username already exists. Choose a different username.");
      return;
    }

    localStorage.setItem(user, pass);
    setErrorMessage("Registration successful. You can now log in.");
    setAUser(""); 
    setAPass(""); 
  }

  return (
    <div className="container">
      <h1>
        <CommentOutlined color={"green"} /> Chat Room{" "}
      </h1>

      <div className="form-container">
        <input
          className="input"
          value={user}
          onChange={(e) => setAUser(e.target.value)}
          placeholder="Write a Username"
          onKeyPress={handleKeyPress}
        ></input>
        <input
          className="input"
          type="password"
          value={pass}
          onChange={(e) => setAPass(e.target.value)}
          placeholder="Write a password"
          onKeyPress={handleKeyPress}
        ></input>
        <button onClick={() => handleSetUser()} className="button">
          Login
        </button>
        <button onClick={() => handleRegistration()} className="button">
          Register
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}