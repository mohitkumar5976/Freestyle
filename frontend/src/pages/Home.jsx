import { Grid2 } from "@mui/material";
import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <Grid2
      container
      direction={"column"}
      sx={{
        backgroundColor: "red",
        minHeight: "100vh",
      }}
    >
      <Grid2 item sx={{ height: "55px",backgroundColor:"green",width:"100%" }}>
        <Header />
      </Grid2>
      <Grid2 item sx={{flexGrow:1,backgroundColor:"yellow"}}>Drawing Board</Grid2>
    </Grid2>
  );
};

export default Home;
