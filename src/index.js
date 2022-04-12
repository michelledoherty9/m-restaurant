import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "././components/Dashboard.js";
import Login from "././components/Login.js";
import Navbar from "././components/Navbar.js";
import Register from "././components/Register.js";
import Storage from "././components/Storage.js";
import Favourite from "././components/Favourite.js";


axios.defaults.withCredentials = true;

const Demo = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route path="/dashboard/storage" element={<><Navbar /><Storage /></>} />
          <Route path="/dashboard/favourite" element={<><Navbar /><Favourite /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
