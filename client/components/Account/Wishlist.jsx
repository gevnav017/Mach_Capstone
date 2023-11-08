import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([1, 2, 3]);

  return (
    <>
      {wishlist &&
        wishlist.map((item, idx) => (
          <Card key={idx} sx={{ display: "flex", minWidth: "400px", mb: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: { xs: "170px", md: "150px" }, objectFit: "contain", minHeight: "100%", p: 1 }}
              image="data:image/jpeg;base64,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"
              alt="earbud"
            />
            <Grid container>
              <Grid item xs={12} md={5}>
                <CardContent>
                  <Typography component="div" variant="h5">
                    Quiet Comfort Pro
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Bluetooth
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CardContent>
                  <Typography component="div" variant="h5">
                    $256.56
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-between", sm: "end" },
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Button>Add to cart</Button>
                <Button color="error">
                  <CloseOutlinedIcon />
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
    </>
  );
};

export default Wishlist;
