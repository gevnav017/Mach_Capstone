import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports
import MasonryImageList from "./MasonryImageList";
import MaxWidthDialog from "./MaxWidthDialog";
// import BasicTextField from "./BasicTextField";

// MUI imports
import Carousel from "react-material-ui-carousel";
import { Container, Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

let i = -1;

const MasonryImages = ({ item }) => {
  let imgHeights = [220, 90, 150, 70, 110, 180, 80, 160];

  i++;
  let imgHeight = imgHeights[i];

  return (
    <Box style={{ width: "200px", height: imgHeight }}>
      <img
        srcSet={item.image}
        src={item.image}
        alt={item.name}
        loading="lazy"
        style={{
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          borderRadius: "10px",
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};

const Home = () => {
  // store the items from db in this state
  const [items, setItems] = useState([]);

  // make axios call here to the API to get all items
  useEffect(() => {
    Axios.get("http://localhost:3000/api/products")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ width: "100%", minWidth: "400px", p: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Carousel sx={{ width: "800px" }}>
          {items &&
            items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: "100%",
                  height: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "50px",
                    boxSizing: "border-box",
                  }}
                />
              </Box>
            ))}
        </Carousel>

        <Masonry spacing={4} >
          {items.map((item) => (
            <MasonryImages key={item.id} item={item} />
          ))}
        </Masonry>
      </Box>

      <MaxWidthDialog />
    </Container>
  );
};

export default Home;
