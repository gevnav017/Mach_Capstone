import React, { useState, useEffect } from "react";
import Axios from "axios";

// component imports
import MasonryImageList from "./MasonryImageList";

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
    <Container maxWidth="lg" sx={{ minWidth: "400px", p: 3 }}>
      <Box sx={{ display: "grid", justifyContent: "center", gap: 4 }}>
        <Box>
          <Carousel>
            {items &&
              items.map((item, index) => (
                <Box key={index} sx={{ width: "600px", height: "600px" }}>
                  <img
                    src={item.image}
                    alt={item.caption}
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundSize: "cover",
                      objectFit: "contain",
                    }}
                  />
                  <p>{item.caption}</p>
                </Box>
              ))}
          </Carousel>
        </Box>

        <Masonry
          columns={6}
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {items.map((item, index) => (
            <MasonryImages key={index} item={item} />
          ))}
        </Masonry>
      </Box>
    </Container>
  );
};

export default Home;
