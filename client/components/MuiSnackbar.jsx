// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Speakers from '../Speakers';

// // export default function MuiSnackbar() {
// //   const [open, setOpen] = React.useState(false);

// //   const handleClick = () => {
// //     setOpen(true);
// //   };

// //   const handleClose = (event, reason) => {
// //     if (reason === 'clickaway') {
// //       return;
// //     }

// //     setOpen(false);
// //   };

// //   const action = (
// //     <React.Fragment>
// //       <Button color="secondary" size="small" onClick={handleClose}>
// //         UNDO
// //       </Button>
// //       <IconButton
// //         size="small"
// //         aria-label="close"
// //         color="inherit"
// //         onClick={handleClose}
// //       >
// //         <CloseIcon fontSize="small" />
// //       </IconButton>
// //     </React.Fragment>
// //   );

// //   return (
// //     <div>
// //       <Button onClick={handleClick}>Added to Cart!</Button>
// //       <Snackbar
// //         open={open}
// //         autoHideDuration={6000}
// //         onClose={handleClose}
// //         message="Note archived"
// //         action={action}
// //       />
// //     </div>
// //   );
// // }

// export default function MuiSnackbar({ open, handleClose: closeHandler }) {
//   // const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

//   const action = (
//     <React.Fragment>
//       <Button color="secondary" size="small" onClick={handleClose}>
//         UNDO
//       </Button>
//       <IconButton
//         size="small"
//         aria-label="close"
//         color="inherit"
//         onClick={handleClose}
//       >
//         <CloseIcon fontSize="small" />
//       </IconButton>
//     </React.Fragment>
//   );

//   return (
//     <div>
//       <Button onClick={handleClick}>Added to Cart!</Button>
//       <Snackbar
//         open={props.open}
//         autoHideDuration={6000}
//         onClose={closeHandler}
//         message="Note archived"
//         action={action}
//       />
//     </div>
//   );
// }