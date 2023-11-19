import React, { useState, useEffect } from "react";

// component imports

// MUI imports
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Profile = ({ user }) => {
  console.log(user);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar />
    </Stack>
  );
};

export default Profile;
