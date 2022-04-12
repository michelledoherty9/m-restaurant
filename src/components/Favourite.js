// Add favourite restaurant page!

import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


import { Table } from "react-bootstrap"

const Favourite = () => {

    // These are all functions but since return(), show part.

    const [foodName, setFoodName] = useState("");
    const [conName, setConName] = useState("");
    const [price, setPrice] = useState("");
    const [favourites, setFavourites] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [msg, setMsg] = useState("");
    // const navigate = useNavigate();

    useEffect(() => {
        getFavourites();
    }, [msg]);

    // Search function!
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        console.log(favourites);
        if (searchValue !== "") {
            console.log(searchValue);
            const filteredData = favourites.filter((item) => {
                return (
                    Object.values(item)
                        .toString()
                        .replaceAll(",", " ")
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                );
            });
            console.log("===============", searchValue);
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(favourites);
        }
    };

    // show (Restaurant name, country, price) on your display from your server!
    const getFavourites = async () => {
        try {
            const response = await axios.get("http://localhost:5000/favourite");
            console.log(response.data);
            setFavourites(response.data)
        }
        catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    // Add (Restaurant name, country, price) to your server!
    const Favourite = async (e) => {
        e.preventDefault();
        if (foodName === "") {
            setMsg("you need to type your name necessarily!");
        } else if (conName === "") {
            setMsg("you neet to type your email necessarily!");
        } else if (price === "") {
            setMsg("you neet to type your email necessarily!");
        }
        else {

            try {
                const res = await axios.post("http://localhost:5000/favourite", {
                    foodName: foodName,
                    conName: conName,
                    price: price
                });
                console.log(res.price)
                alert(res.data.msg);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
            window.location.reload();
        }
    };
    // Delete function!    
    const Delete = async (foodname) => {
        try {
            console.log(foodname)
            const res = await axios.delete("http://localhost:5000/favourite", { data: { foodname } });
            setMsg(res.data.msg);
        } catch (error) { }
        window.location.reload();
    };
    // Image function!
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
        {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
        },
        {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
        },
        {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
        },
        {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
        },
        {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
        },
        {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
        },
        {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
        },
    ];
    // Show Section!
    return (<div className="container">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={10} md={8}>
                    <form onSubmit={Favourite}>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="With FoodName" variant="standard" sx={{ mr: 2 }} onChange={(e) => setFoodName(e.target.value)} />
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="With ConName" variant="standard" sx={{ mr: 2 }} onChange={(e) => setConName(e.target.value)} />
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="With Price" variant="standard" sx={{ mr: 2 }} onChange={(e) => setPrice(e.target.value)} />
                                <button className="button is-danger">ADD</button>
                            </Box>
                        </Box>
                    </form>
                </Grid>
                <Grid item xs={10} md={4}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mt: 5 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Name"
                            onChange={(e) => searchItems(e.target.value)}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <DirectionsIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={10} md={8}>
                    <Table className="table is-striped is-fullwidth mt-2">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Restaurant</th>
                                <th>Country</th>
                                <th>Price($)</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchInput.length > 0
                                    ? filteredResults.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <input
                                                    className="upInput"
                                                    type="text"
                                                    defaultValue={user.foodName}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="upInput"
                                                    type="text"
                                                    defaultValue={user.conName}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="upInput"
                                                    type="text"
                                                    defaultValue={user.price}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="button is-danger"
                                                    onClick={() => Delete(user.foodname)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    : favourites.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <input
                                                    className="upInput"
                                                    type="text"
                                                    defaultValue={user.foodName}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="upInput"
                                                    type="text"
                                                    defaultValue={user.conName}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    className="upInput"
                                                    type="text"
                                                    defaultValue={user.price}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="button is-danger"
                                                    onClick={() => Delete(user.foodName)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    ))}
                        </tbody>
                    </Table>
                </Grid>
                <Grid item xs={10} md={4}>
                    <Box sx={{ width: 700, height: 450, overflowY: 'scroll' }}>
                        <ImageList variant="masonry" cols={3} gap={8}>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img}>
                                    <img
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    </div>)
}

export default Favourite;