import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

export default function EditItem() {
    let temp = window.location.href.split('/');
    let itemId = temp[temp.length - 2];

    if (temp[temp.length - 1] === '') itemId = temp[temp.length - 3];

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

    const inputValidation = () => {
        if (item.brand === '' ||item.name === '' || item.price === 0 ||
            item.category === '' || item.subcategory === '' ||
            isNaN(item.price) || isNaN(item.quantity) ||
            item.price < 0 || item.quantity < 0) return false;
        return true;
    };

    const handleClick = e => {
        e.preventDefault();

        if (inputValidation()) {
            fetch(`http://localhost:8080/api/items/${itemId}`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(item)
            }).then(() =>
                navigate(`/items/${itemId}`)
            )
        } else {
            alert("Please check the inputs.");
        }
    };

    const handleChange = prop => e => {
        if (prop === 'category') {
            setItem({ ...item, category: e.target.value.split(",")[0], subcategory: e.target.value.split(",")[1] });
        } else {
            setItem({ ...item, [prop]: e.target.value });
        }
    };

    return(
        <Paper sx={{ width: '50%', overflow: 'hidden', mx: "auto", marginTop: '10px', p: 2}}>
            <Stack direction="column" spacing={2}>
                <h1>Edit item</h1>
                <TextField id="brand" label="Brand" variant="outlined" value={item.brand} onChange={handleChange('brand')} required />
                <TextField id="name" label="Name" variant="outlined" value={item.name} onChange={handleChange('name')} required />

                <Stack direction="row" spacing={2}>
                    <TextField id="price" label="Price" variant="outlined" value={item.price} onChange={handleChange('price')} required fullWidth
                        InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
                    />
                    <TextField id="quantity" label="Quantity" variant="outlined" value={item.quantity} onChange={handleChange('quantity')} required fullWidth />
                </Stack>
            
                <FormControl>
                    <InputLabel htmlFor="category" required>Category</InputLabel>
                    <Select native defaultValue="" id="category" label="Category" onChange={handleChange('category')} displayEmpty>
                        <option value={[item.category, item.subcategory]}>{item.subcategory}</option>
                        <optgroup label="Interior">
                            <option value={["Interior", "Steering Wheels"]}>Steering Wheels</option>
                            <option value={["Interior", "Shift Knobs"]}>Shift Knobs</option>
                            <option value={["Interior", "Seats"]}>Seats</option>
                        </optgroup>
                        <optgroup label="Exterior">
                            <option value={["Exterior", "Body Kit"]}>Body Kit</option>
                            <option value={["Exterior", "Spoiler"]}>Spoiler</option>
                        </optgroup>
                        <optgroup label="Performance">
                            <option value={["Performance", "Exhaust"]}>Exhaust</option>
                            <option value={["Performance", "Suspension"]}>Suspension</option>
                        </optgroup>
                        <optgroup label="Lighting">
                            <option value={["Lighting", "Headlights"]}>Headlights</option>
                            <option value={["Lighting", "Tail Lights"]}>Tail Lights</option>
                        </optgroup>
                    </Select>
                </FormControl>
                <TextField id="description" label="Description" variant="outlined" value={item.description === null ? '' : item.description} onChange={handleChange('description')} />
                
                <Stack alignItems="center">
                    <Button variant="outlined" sx={{ width: '25%'}} onClick={e => handleClick(e)}>Confirm Edit</Button>
                </Stack>
            </Stack>
        </Paper>
    );
}