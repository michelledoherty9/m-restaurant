// Main page after login!
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Dropdown, DropdownButton, InputGroup, Table } from "react-bootstrap"

// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

import "./dashboard.css";


const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [updateName, setUpdateName] = useState();
  const [updateEmail, setUpdateEmail] = useState();
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.get("http://localhost:5000/token");
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      } catch (error) {
        if (error.response) {
          navigate("/");
        }
      }
    };

    const getUsers = async () => {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    };
    refreshToken();
    getUsers();
  }, [msg, token, navigate, axiosJWT]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    console.log(users);
    if (searchValue !== "") {
      console.log(searchValue);
      const filteredData = users.filter((item) => {
        return (
          Object.values(item)
            // .join("")
            .toString()
            .replaceAll(",", " ")
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
      console.log("===============", searchValue);
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(users);
    }
  };







  const update = async (id, password) => {
    try {
      const res = await axios.put("http://localhost:5000/update", {
        id: id,
        name: updateName,
        email: updateEmail,
        password: password,
      });
      alert(res.data.msg);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
  };

  const Delete = async (name) => {
    try {
      const res = await axios.delete("http://localhost:5000/delete", {
        data: { name },
      });
      setMsg(res.data.msg);
    } catch (error) { }
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Welcome Back: {name}</h1>
      <h2>{msg}</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={10}>

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Search..." variant="standard" sx={{ mr: 2 }} onChange={(e) => searchItems(e.target.value)} />

              </Box>
            </Box>

          </Grid>
          <Grid item xs={10} md={12}>
            <Table className="table is-striped is-fullwidth mt-2">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>add or delete</th>
                </tr>
              </thead>
              <tbody>
                {console.log("Lee---------", filteredResults, searchInput)}
                {searchInput.length > 0
                  ? filteredResults.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          className="upInput"
                          type="text"
                          defaultValue={user.name}
                          onChange={(e) => setUpdateName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="upInput"
                          type="text"
                          defaultValue={user.email}
                          onChange={(e) => setUpdateEmail(e.target.value)}
                        />
                      </td>
                      <td>{user.password}</td>
                      <td>
                        <div className="buttons">
                          <button
                            className="button is-info"
                            onClick={() => update(user.id, user.password)}
                          >
                            Edit
                          </button>
                          <button
                            className="button is-danger"
                            onClick={() => Delete(user.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  : users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          className="upInput"
                          type="text"
                          defaultValue={user.name}
                          onChange={(e) => setUpdateName(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="upInput"
                          type="text"
                          defaultValue={user.email}
                          onChange={(e) => setUpdateEmail(e.target.value)}
                        />
                      </td>
                      <td>{user.password}</td>
                      <td>
                        <div className="buttons">
                          <button
                            className="button is-info"
                            onClick={() => update(user.id, user.password)}
                          >
                            Edit
                          </button>
                          <button
                            className="button is-danger"
                            onClick={() => Delete(user.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Grid>
          <Grid item xs={10} md={10}>
            <h3 className="mt-5 mb-3">Please add favourite restaurant or select restaurant!</h3>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Favourite"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="http://localhost:3000/dashboard/storage">Select restaurant</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="http://localhost:3000/dashboard/favourite">Add favourite restaurant</Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
};

export default Dashboard;
