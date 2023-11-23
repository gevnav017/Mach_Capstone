import React, { useState, useEffect } from "react";

// component imports
import Navbar from "./components/Navbar";
import MaxWidthDialog from "./components/MaxWidthDialog";

// MUI imports


const App = () => {

  return (
    <>
      <Navbar />
      <MaxWidthDialog />
    </>
  );
};

export default App;
