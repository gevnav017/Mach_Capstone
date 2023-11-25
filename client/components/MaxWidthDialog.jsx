import * as React from 'react';
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


export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
// const [email, setEmail] = React.useState('');

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

  // const handleEmailChange = (e) => {
  //   e.preventDefault();
  //   console.log('Email submitted:', email);
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Email submitted:', email);
  // }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        GET 10% OFF
      </Button>
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
          {/* <form onSubmit={handleSubmit}> */}
          <DialogInputForm />
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
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              {/* <input 
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              /> */}
            </FormControl>
            {/* <Button type="submit" variant="contained" color="primary">Submit</Button> */}
          </Box>
          {/* </form> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}