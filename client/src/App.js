import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom";
import React, { useState, useContext } from "react";

import Main from './pages/main';
// import Header from './pages/header'; 
import HeaderIn from './pages/headerIn';
import HeaderOut from './pages/headerOut';
import Footer from './pages/footer';
import Login from './pages/login';
import Signup from './pages/signup';
import Detail from './pages/bookDetail';

import NotFound from './pages/NotFound';

import authContext from './authContext';



function App() {

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <div className="App">
        <BrowserRouter>
          {authenticated ? <HeaderIn />: <HeaderOut />}
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/bookDetail" element={<Detail />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

      </div>
    </authContext.Provider>
  );
}

export default App;
