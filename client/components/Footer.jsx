import React from "react";

// component imports

// MUI imports
import { Container, Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Container
      maxWidth="xxl"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        height: "50px",
      }}
    >
        <Box gap={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box>
            <InstagramIcon />
          </Box>
          <Box>
            <FacebookIcon />
          </Box>
          <Box>
            <TwitterIcon />
          </Box>
        </Box>
    </Container>
  );
};

export default Footer;
