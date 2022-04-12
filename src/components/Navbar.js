// Top bar (fixed section)!
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">

        <div className="navbar-brand">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>MC</Avatar>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={Logout} className="button is-light">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
