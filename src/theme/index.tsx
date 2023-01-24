import React, { Children } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { relative } from "path";

let i = new Array(60).fill(5);

const Layout = ({ ...props }) => (
  <Box sx={{ height: "100vh", width: "100vw" }}>
    <Header />
    <Box
      sx={{
        display: "flex",
        padding: "0px 20px",
        alignItems: "center",
      }}
    >
      <>
        <Sidebar />
        <Box
          sx={{
            display: "flex",
            marginLeft: "100px",
            width: "100%",
            flexDirection: "column",
            minHeight: "80vh",
          }}
        >
          {props.children}
        </Box>
      </>
    </Box>
  </Box>
);

export default Layout;
