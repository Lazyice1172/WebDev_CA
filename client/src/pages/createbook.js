
import '../App.css';
import React, { useState, useContext } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router";

import authContext from '../authContext';


export default function CreateBook() {

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

    const response = await fetch("http://localhost:8000/book/add", {
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
      window.alert("Successfully!");
      navigate("/");

    } else {
      //console.log("Not Find")
      window.alert("Fail to add!");

    }

    setBook({ title: "", author: "" });

  }

  return (
    <React.Fragment>
      <div className="mx-auto login-wrapper">
        <h2 className="text-success">Create Book</h2>


        <form action="server_url" id="login-form" onSubmit={onSubmit}>

          <input className="border-1"
            type="text"
            name="title"
            placeholder="Title"
            value={book.title}
            id="bookTitle"
            onChange={(e) => updateBook({ title: e.target.value })}
          />
          <input className="border-1"
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            id="bookAuthor"
            onChange={(e) => updateBook({ author: e.target.value })}
          />
          
          <input className="bg-success border-1" type="submit" value="Create" />
        </form>
      </div >
    </React.Fragment>
  );
}


