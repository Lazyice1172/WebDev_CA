

// Not Use Anymore

import React, { useContext } from 'react';
import { useState } from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Main from './main';
import Login from './login';
import Signup from './signup';

import authContext from '../authContext';


function Header(props) {
    const [comp, setComp] = useState(Main);
    //const [is_login, setIsLogin] = React.useState(false);

    const { setAuthenticated } = useContext(authContext);
    const handleLogin = () => setAuthenticated(true);
    const handleLogout = () => setAuthenticated(false);


    function LogInOut() {
        if (false) {
            return (
                <div>
                    <form className="d-flex">
                        <button className="btn btn-outline-dark" type="submit" onClick={handleLogout}>
                            <i className="bi-cart-fill me-1"></i>
                            Logout
                        </button>
                    </form>
                </div>

            );
        } else {
            return (
                <div>
                    <Link to="/login">
                        <button className="btn btn-outline-dark" type="submit" onClick={handleLogin}> {/* test  */}
                            <i className="bi-cart-fill me-1 "></i>
                            Sign in
                        </button>
                    </Link>
                </div>
            );
        }
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <Link to="/">
                        <img className="header-logo" src={"/assets/logo.png"} width="200px" alt="logo"></img></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                            {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#!">All Products</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a className="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li> */}
                        </ul>

                        <tbody>{LogInOut()}</tbody>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );

}

export default Header;

