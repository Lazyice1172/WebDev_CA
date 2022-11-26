import '../App.css';
import React, { useState, useEffect } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useParams, useNavigate } from "react-router";

export default function EditBook() {

    const [books, setBooks] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    

    useEffect(() => {

        async function getBookDetails() {
            // console.log("IN")

            const id = params.id.toString();
            const response = await fetch(`http://localhost:8000/bookDetail/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const result = await response.json();
            if (!result) {
                window.alert(`Book with id ${id} not found`);
                navigate("/");
                return;
            }

            setBooks(result);


        }

        console.log("Books Details")

        getBookDetails();

        return;

    }, [params.id, navigate]);



    return (
        <>
           <div className="mx-auto login-wrapper">
        <h2 className="text-success">Edit Book Detail</h2>


        {/* <form action="server_url" id="login-form" onSubmit={onSubmit}> */}
        <form action="server_url" id="login-form">


          <input className="border-1"
            type="text"
            name="title"
            placeholder="Title"
            value={books.title}
            id="bookTitle"
            // onChange={(e) => updateBook({ bookTitle: e.target.value })}
          />
          <input className="border-1"
            type="text"
            name="author"
            placeholder="Author"
            value={books.author}
            id="bookAuthor"
            // onChange={(e) => updateBook({ bookAuthor: e.target.value })}
          />
          
          <input className="bg-success border-1" type="submit" value="Submit" />
        </form>
      </div >
        </>
    );
}


