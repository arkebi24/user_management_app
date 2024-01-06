import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import _ from 'underscore';

export default function ButtonAppBar() {

  console.log('hello');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users Management
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} href='/adduser'>
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
