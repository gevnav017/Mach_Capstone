import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import DialogInputForm from './DialogInputForm';
import { Container } from '@mui/material';

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [showSubscribedDialog, setShowSubscribedDialog] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const handleSubscribe = (email) => {
   console.log('Email submitted:', email);
   setOpen(false);
   setShowSubscribedDialog(true);
  };

  const handleCloseSubscribedDialog = () => {
    setShowSubscribedDialog(false);
  };

  return (
    <React.Fragment>
      <Container sx={{
    position: "fixed",
    left: 0,
    bottom: '20px'}}>
      <Button 
      variant="outlined" 
      onClick={handleClickOpen}
      style={{
        fontSize: '18px',
        fontWeight: 'bold'
      }}
      >
        GET 10% OFF
      </Button>
      </Container>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>SIGN UP NOW FOR YOUR 10% OFF</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Join our email list and be the first to know about exciting sales, gifting and more!
          </DialogContentText>
          <DialogInputForm onSubscribe={handleSubscribe} />
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              m: 'auto',
              width: 'fit-content',
            }}
          >
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
        
       {/* Subscribed Dialog Box */}
      <Dialog open={showSubscribedDialog} onClose={handleCloseSubscribedDialog}>
        <DialogTitle>Thanks for subscribing!</DialogTitle>
        <DialogContent>
          <DialogContentText>Check your email for your 10% discount code!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubscribedDialog}>Close</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}