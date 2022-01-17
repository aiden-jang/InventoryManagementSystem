import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" onClick={() => {window.location.href="/"}} style={{cursor: 'pointer'}}>
            IMS
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}