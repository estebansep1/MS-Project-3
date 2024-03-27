import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import _ from "lodash";
import "./css/UserLogin.css";

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState("");
  const [pass, setAPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSetUser() {
    if (!user || !pass) {
      setErrorMessage("Username and password are required.");
      return;
    }

    const response = await fetch(`http://localhost:5001/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user, password: pass })
    });

    if (response.status === 401) {
      setErrorMessage("Invalid username or password");
    } else if (response.status === 200) {
      setErrorMessage("Login successful");
      localStorage.setItem("user", user);
      setUser(user);
      localStorage.setItem(
        "avatar",
        `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
      );
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  function handleKeyPress(keyEvent) {
    if (keyEvent.key === "Enter") {
      handleSetUser();
    }
  }

  async function handleRegistration() {
    if (!user || !pass) {
      setErrorMessage("Username and password are required.");
      return;
    }

    const response = await fetch(`http://localhost:5001/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user, password: pass })
    });

    if (response.status === 400) {
      const data = await response.json();
      setErrorMessage(data.message);
    } else if (response.status === 201) {
      setErrorMessage("Registration successful. You can now log in.");
      setAUser("");
      setAPass("");
    } else {
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="container-1">
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
    </div>
  );
}

