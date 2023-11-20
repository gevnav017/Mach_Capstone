import React, { useState, useEffect } from 'react'

// component imports


// MUI imports
import { Container } from '@mui/material'

const Orders = ({ user }) => {
  // state to hold orders


  // axios call to get orders that have inCart column false by logged in user from db


  // function to add view order details

  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      {/* map through orders state to display all orders from the logged in user */}
      {/* button on each order item to click and view order details...dialog box opens up */}
      Orders

    </Container>
  )
}

export default Orders