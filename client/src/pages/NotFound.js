
import '../App.css';
import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";


export default function NotFound() {
  return (
    <div class="main-wrapper">
      <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1>Oops!</h1>
                <h2>Page Not Found</h2>
            </div>
                <a class="rounded shadow"><Link to="/">Back to home</Link></a>
          </div>
      </div>
          
    </div>

  );
}
