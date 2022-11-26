
import '../App.css';
import React, { useState, useContext } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router";

import authContext from '../authContext';


export default function CreateBook() {


  const { authenticated, setAuthenticated } = useContext(authContext);
  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => setAuthenticated(false);

  //console.log(authenticated)

  const [book, setBook] = useState({
    title: "",
    author: "",
  })
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateBook(value) {
    return setBook((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newBook = { ...book };

    //console.log("1")
    const response = await fetch("http://localhost:8000/createbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    console.log(response);
    if (response.status === 200) {
      console.log("Okay")
      handleLogin();
      window.alert("Successfully!");
      navigate("/");

    } else {
      console.log("Not Find")
      handleLogout();
      window.alert("Fail to add!");

    }

    setBook({ title: "", author: "" });

  }


  return (
    <React.Fragment>
      <div className="mx-auto login-wrapper">
        <h2 className="text-success">Create Book</h2>

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
          <input className="border-1"
            type="text"
            name="title"
            placeholder="Title"
            value={book.title}
            id="bookTitle"
            onChange={(e) => updateBook({ bookTitle: e.target.value })}
          />
          <input className="border-1"
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            id="bookAuthor"
            onChange={(e) => updateBook({ bookAuthor: e.target.value })}
          />
          
          <input className="bg-success border-1" type="submit" value="Create" />
        </form>
      </div >
    </React.Fragment>
  );
}


