import React from "react";
import { Container, Paper, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom>
          Article Hub
        </Typography>
        <Typography variant="body1">
          Discover a wide range of articles on various topics including
          technology, health, lifestyle, and more. Stay informed and entertained
          with our curated content.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;
