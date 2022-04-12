// Visitor's page(select favourite name)!
import { useEffect, useState } from 'react'
import axios from 'axios'

// import { DataGridpro } from '@mui/x-data-grid-pro';
import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

const Storage = () => {

    // const [select, setSelection] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [msg, setMsg] = useState("");
    
    useEffect(() => {
        getFavourites();
    }, [msg]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'foodName', headerName: 'Restaurant name', width: 230 },
        { field: 'conName', headerName: 'Country name', width: 230 },
        {
            field: 'price',
            headerName: 'Price(USD)',
            type: 'number',
            width: 130,
        },
    ];

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


    return (<div className='container'>
        <h1>Welcome food storage!</h1>
        <div style={{ height: 400, width: '80%' }}>
            <DataGrid
                rows={favourites}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            {/* <h1>{select}</h1> */}
        </div>

    </div>
    );

}
export default Storage;