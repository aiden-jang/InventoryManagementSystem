import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function ViewItem() {
    let temp = window.location.href.split('/');
    let itemId = temp[temp.length - 1];

    if (temp[temp.length - 1] === '') itemId = temp[temp.length - 2];
    
    const [item, setItem] = useState({
        brand: '',
        name: '',
        price: 0,
        quantity: 0,
        category: '',
        subcategory: '',
        description: ''
      });

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/items/${itemId}`)
            .then(res => res.json())
            .then(result => setItem(result))
            .catch(() => navigate('/'))
    }, []);

    const handleClick = (e, prop) => {
        e.preventDefault();

        if (prop === 'Edit') {
            navigate(`/items/${itemId}/edit`);
        } else {
            if (window.confirm("Delete the item?")) {
                fetch(`http://localhost:8080/api/items/${itemId}`, {
                    method: "DELETE",
                    headers: {"Content-Type" : "application/json"}
                }).then(() =>
                    navigate('/')
                )
            }
        }
    };

    return(
        <Paper sx={{ display: 'flex', flexDirection: 'column', width: '50%', overflow: 'hidden', mx: "auto", marginTop: '10px', p: 2}}>
            <h1>View item</h1>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <p>Brand: {item.brand}</p>
                <p>Name: {item.name}</p>
            </Box>
            <Divider variant="middle" />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
            </Box>
            <Divider variant="middle" />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <p>Category: {item.category}</p>
                <p>Subcategory: {item.subcategory}</p>
            </Box>
            <Divider variant="middle" />
                   
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <p>Description: {item.description === null || item.description === "" ? "N/A" : item.description}</p>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button variant="outlined" sx={{ width: '25%'}} onClick={e => handleClick(e, 'Edit')}>Edit</Button>
                <Button variant="outlined" sx={{ width: '25%'}} onClick={e => handleClick(e, 'Delete')}>Delete</Button>
            </Box>
        </Paper>
    );
}