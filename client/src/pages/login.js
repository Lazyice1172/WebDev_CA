
import '../App.css';
import React, { useState, useContext } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router";

import authContext from '../authContext';


export default function Login() {


  const { authenticated, setAuthenticated } = useContext(authContext);
  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => setAuthenticated(false);

  console.log(authenticated)

  const [user, setUser] = useState({
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

    //console.log("1")
    const response = await fetch("http://localhost:8000/login", {
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

    console.log(response);
    if (response.status === 200) {
      console.log("Okay")
      handleLogin();
      navigate("/");

    } else {
      console.log("Not Find")
      handleLogout();

    }

    setUser({ userEmail: "", userPassword: "" });

  }


  return (
    <React.Fragment>
      <div className="mx-auto login-wrapper">
        <h2 className="text-success">Login</h2>

        {/*
      <form onSubmit={onSubmit}> 
      <form method="post" action="server_url" id="login-form">
              <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      */}

        <form action="server_url" id="login-form" onSubmit={onSubmit}>
          {/* 
        <input type="text" name="userName" placeholder="Email" />
        <input type="password" name="userPassword" placeholder="Password" />
        */}
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
          <input className="bg-success" type="submit" value="Login" />
        </form>

        <Link to='/signup'>
          <p className="text-secondary">Sign up</p>
        </Link>
      </div >
    </React.Fragment>
  );
}


