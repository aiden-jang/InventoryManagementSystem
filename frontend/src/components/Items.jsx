import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const columns = [
  { id: 'brand', label: 'Brand', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 170, align: 'right' },
  { id: 'quantity', label: 'Quantity', minWidth: 170, align: 'right' },
  { id: 'category', label: 'Category', minWidth: 170, align: 'right' },
  { id: 'subcategory', label: 'Subcategory', minWidth: 170, align: 'right' }
];

export default function Items() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [priceRange, setPriceRange] = useState(['', '999999']);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/items/getAll")
      .then(res => res.json())
      .then(result => setRows(result))
  }, []);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`/items/${id}`);
  };

  const handleChange = (e, prop) => {
    e.preventDefault();
    if (prop === 'keyword') {
      setKeyword(e.target.value);
    } else if (prop === 'priceMin') {
      setPriceRange([e.target.value, priceRange[1]])
    } else if (prop === 'priceMax') {
      setPriceRange([priceRange[0], e.target.value])
    }
  };

  const handleClickSearch = e => {
    e.preventDefault();
    if (inputValidation()) {
      fetch(`http://localhost:8080/api/items/getAll?keyword=${keyword}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`)
      .then(res => res.json())
      .then(result => setRows(result))
    } else {
      alert("Please check the inputs.")
    }
  };

  const inputValidation = () => {
    if (Number(priceRange[0]) > Number(priceRange[1]) ||
        isNaN(priceRange[0]) || isNaN(priceRange[1]) ||
        priceRange[0] < 0 || priceRange[1] < 0) return false;
    return true;
  };

  return (
    <div>
      <Stack spacing={2} direction="row" sx={{margin: '15px'}}>
        <Button variant="outlined" component={Link} to={'/add'} fullWidth>Add Item</Button>
        <TextField id="search" label="Search" variant="outlined" value={keyword} onChange={e => handleChange(e, 'keyword')} fullWidth />
        <Button variant="outlined" onClick={e => handleClickSearch(e)} fullWidth>Search</Button>

        <TextField id="priceMin" label="Min Price" variant="outlined" value={priceRange[0]} onChange={e => handleChange(e, 'priceMin')} fullWidth
          InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
        />
        <TextField id="priceMax" label="Max Price" variant="outlined" value={priceRange[1] === '999999' ? '' : priceRange[1]} onChange={e => handleChange(e, 'priceMax')} fullWidth
          InputProps={{ startAdornment: (<InputAdornment position="start">$</InputAdornment>)}}
        />
        <Button variant="outlined" onClick={e => handleClickSearch(e)} fullWidth>Filter</Button>
      </Stack>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '10px'}}>
        <TableContainer sx={{ maxHeight: 350 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, idx) => (
                  <TableCell
                    key={idx}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}
                      onClick={e => handleClick(e, row.id)}>
                      {columns.map((column, idx) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={idx} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}