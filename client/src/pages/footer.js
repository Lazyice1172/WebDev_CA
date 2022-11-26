import React from 'react';
import { useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";


function Footer(props) {
    return (
        <>
            <footer class="container-fluid navbar-fixed-bottom  bg-light mt-auto py-3">
                <div class="container"><p class="m-0 text-center text-black">Copyright &copy; Web Assignment</p></div>
            </footer>
            {/* // <!-- Bootstrap core JS--> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            {/* // <!-- Core theme JS--> */}
            <script src="js/scripts.js"></script>
        </>
    )
}

export default Footer