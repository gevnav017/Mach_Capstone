import React from "react";

// component imports

// MUI imports
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const Earbuds = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 3 }}>
      <Typography centered variant="h5" sx={{ my: 2 }}> Earbuds </Typography>
      {/* <Grid container spacing={2}>
        {[1, 2, 3, 4, 5].map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Earbud
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  earbud details
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ mr: "auto" }}>Favorite</Button>
                <Button size="small">Buy</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </Container>
  );
};

export default Earbuds;
