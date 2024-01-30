import React, { useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import _ from "lodash";
import "../Scss/UserLogin.scss";

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState("");
  const [pass, setAPass] = useState("");

  function handleSetUser() {
    if (!user) return;
    localStorage.setItem("user", user);
    setUser(user);
    localStorage.setItem(
      "avatar",
      `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
    );
  }

  function handleKeyPress(keyEvent) {
    if (keyEvent.key === "Enter") {
      handleSetUser();
    }
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
        <button onClick={() => handleSetUser()} className="button">
          Login
        </button>
        <input
          className="input"
          value={pass}
          onChange={(e) => setAPass(e.target.value)}
          placeholder="Write a password"
          onKeyPress={handleKeyPress}
        ></input>
      </div>
    </div>
  );
}
