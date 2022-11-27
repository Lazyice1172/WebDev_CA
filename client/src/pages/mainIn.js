
import '../App.css';
import React, { useState, useEffect } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

const Books = (props) => (
    <div class="col mb-5">
        <div class="card h-100">
            {/* <!-- Product image--> */}
            <img class="card-img-top" src="https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg" alt="..." />
            {/* <!-- Product details--> */}
            <div class="card-body p-4">
                <div class="text-center">
                    {/* <!-- Product name--> */}
                    <h5 class="fw-bolder">{props.book.title}</h5>
                    {/* <!-- Product price--> */}
                    {props.book.author}
                </div>
            </div>
            {/* <!-- Product actions--> */}
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <Link to={`/bookDetail/${props.book._id}`}><div class="text-center"><a class="btn btn-outline-dark mt-auto" >View options</a></div></Link>
            </div>
        </div>
    </div>
);

var Count = 0;

export default function Main() {

    const [books, setBooks] = useState([]);
    const [searchBook, setsearchBook] = useState({
        bookTitle: '',
    })

    // Update to text box
    function updateSearch(value) {
        return setsearchBook((prev) => {
            return { ...prev, ...value }
        });
    }

    // Only Call the Function One times
    useEffect(() => {
        if (Count === 0) {
            console.log("in");
            async function getBooks() {
                const response = await fetch(`http://localhost:8000/books`);
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
                const result = await response.json();
                setBooks(result);
            }
            getBooks();
            Count = 1;
        }
        return;
    }, [books.length]);

    // Function to call All the send back from Back End
    function bookList() {
        return books.map((book) => {
            return (
                <Books
                    book={book}
                />
            )
        });
    }

    // Function to Search Book Title and Add Book
    async function getBookTitle() {
        //console.log(setBooks);
        setBooks([]);
        const findBook = { ...searchBook };
        const response = await fetch(`http://localhost:8000/books/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(findBook),

        }).catch(err => {
            window.alert(err);
            return;
        });

        const result = await response.json();
        console.log(result);
        setBooks(result);
        //console.log(response);
    }

    // Function to get all the books back
    async function Reset() {
        console.log('Reset')
        async function getBooks() {
            const response = await fetch(`http://localhost:8000/books`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            setsearchBook({ bookTitle: '' })
            const result = await response.json();
            setBooks(result);
        }
        getBooks();
    }

    return (
        <div>
            <header class="bg-success py-5">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="text-center text-white">
                        <h1 class="display-4 fw-bolder">Welcome Back</h1>
                        <p class="lead fw-normal text-white-50 mb-0">Enjoy your book</p>
                    </div>
                </div>
            </header>

            {/* <!-- Add Book --> */}

            <Link to="/createbook">
                <button onClick={getBookTitle} className="mt-5  btn btn-outline-success border border-success rounded search_button w-25">
                    Add your book!
                </button>
            </Link>

            {/* <!-- Button Search --> */}
            <div className="flex mb-1 border-2 border-gray-200 rounded m-4">
                <input
                    type="text"
                    className="px-4 py-2 w-80 mx-2"
                    placeholder="Search Book Title"
                    id='bookTitle'
                    name="bookTitle"
                    value={searchBook.bookTitle}
                    onChange={(e) => updateSearch({ bookTitle: e.target.value })}
                />

                <button onClick={getBookTitle} className="mx-1 bg-success text-white border border-success rounded search_button">
                    Search
                </button>
                <button onClick={Reset} class=" border border-success rounded search_button">
                    Reload
                </button>

            </div>

            {/* <!-- Section--> */}
            <section class="py-1">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        <tbody>{bookList()}</tbody>
                    </div>
                </div>
            </section>

        </div >

    );
}
