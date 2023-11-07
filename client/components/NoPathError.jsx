import React from "react";

// component imports

// MUI imports
import { Container, Box, Typography } from "@mui/material";
import { Calculate } from "@mui/icons-material";

const NoPathError = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: {
          xs: "calc(100vh - 56px)",
          sm: "calc(100vh - 64px)",
          md: "calc(100vh - 69px)",
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography>404 Error: No path found</Typography>
      </Box>
    </Container>
  );
};

export default NoPathError;

// import React from "react";
// import Carousel from "react-material-ui-carousel";

// const CarouselExample = () => {
//   const items = [
//     {
//       // add image url/src within the quotes below
//       image: "",
//       caption: "First Image",
//     },
//     {
//       image: "",
//       caption: "Second Image",
//     },
//     {
//       image: "",
//       caption: "Third Image",
//     },
//     // ... add more items as needed
//   ];

//   return (
//     <Carousel>
//       {items.map((item, index) => (
//         <div>
//           <img src={item.image} alt={item.caption} />
//           <p>{item.caption}</p>
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default CarouselExample;
