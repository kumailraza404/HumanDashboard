import React, { Children } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { relative } from "path";

let i = new Array(60).fill(5);

const Layout = ({ ...props }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    }}
  >
    <Sidebar />

    <Box
      sx={{
        width: "90vw",
        padding: "0px 20px",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "20px 0",
        }}
      >
        <Box sx={{ marginTop: "30px" }}>{props.children}</Box>
      </Box>
    </Box>
  </Box>
);

export default Layout;
