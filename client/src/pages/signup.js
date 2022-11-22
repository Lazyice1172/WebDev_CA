
import '../App.css';
import React, { useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router";


export default function Signup() {

  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  })
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateUser(value) {
    return setUser((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...user };

    await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
      
    })
      .catch(error => {
        window.alert(error);
        return;
      });

      window.alert("Account Created Successfully");
    setUser({ userName: "", userEmail: "", userPassword: "" });
    navigate("/login");
  }


  return (
    <div className="mx-auto login-wrapper">
      <h2 className="text-success">Sign up</h2>
      {/*<form method="post" action="server_url" id="login-form"> */}
      <form ction="server_url" id="login-form" onSubmit={onSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Name"
          value={user.userName}
          id="userName"
          onChange={(e) => updateUser({ userName: e.target.value })}
        />
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={user.userEmail}
          id="userEmail"
          onChange={(e) => updateUser({ userEmail: e.target.value })}
        />
        <input
          type="password"
          name="userPassword"
          placeholder="Password"
          value={user.userPassword}
          id="userPassword"
          onChange={(e) => updateUser({ userPassword: e.target.value })}
        />
        <input className="bg-success" type="submit" value="Submit" />
      </form>


    </div>

  );
}
