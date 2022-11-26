import '../App.css';
import React, { useState, useEffect } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useParams, useNavigate } from "react-router";

export default function Detail() {

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
            <section class="py-5">
                <div class="container px-4 px-lg-5 my-5">
                    <div class="row gx-4 gx-lg-5 align-items-center">
                        <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." /></div>
                        <div class="col-md-6">
                            <div class="small mb-1">BOOK</div>
                            <h1 class="display-5 fw-bolder">{books.title}</h1>
                            <div class="fs-5 mb-5">

                                <span>Author</span>
                            </div>
                            <p class="lead">{books.author}</p>
                            {/* <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                            <button class="btn btn-outline-dark flex-shrink-0" type="button">
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


