import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// component imports
import Profile from "./Profile";
import Wishlist from "./Wishlist";
import Orders from "./Orders";

// MUI imports
import { Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Account = () => {
  // const location = useLocation();
  // const page = location.pathname;
  const [value, setValue] = useState(0);

  // useEffect(() => {
  //   if (page.includes("profile")) {
  //     setValue(0);
  //   } else if (page.includes("wishlist")) {
  //     setValue(1);
  //   } else if (page.includes("orders")) {
  //     setValue(2);
  //   }
  // }, [page]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Profile" />
            <Tab label="Wishlist" />
            <Tab label="Orders"/>
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Wishlist />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Orders />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Account;
