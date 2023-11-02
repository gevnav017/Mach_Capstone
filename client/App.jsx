import React from "react";
import { Button } from "@mui/material";

const App = () => {
  return (
    <>
      <Button color="primary" variant="contained">
        Primary
      </Button>
      <Button color="secondary" variant="contained">
        Secondary
      </Button>
      <Button color="background" variant="contained">
        Background
      </Button>
    </>
  );
};

export default App;
