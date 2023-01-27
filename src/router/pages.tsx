import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Sleep from "../pages/Sleep";
import Layout from "../theme";

const Pages = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/sleep",
    element: (
      <Layout>
        <Sleep />
      </Layout>
    ),
  },
  {
    path: "/work",
    element: (
      <Layout>
        <div>Hello work!</div>
      </Layout>
    ),
  },
  {
    path: "/fitness",
    element: (
      <Layout>
        <div>Hello fitness!</div>
      </Layout>
    ),
  },
  {
    path: "/nutrition",
    element: (
      <Layout>
        <div>Hello nutrition!</div>
      </Layout>
    ),
  },
  {
    path: "/happiness",
    element: (
      <Layout>
        <div>Hello happiness!</div>
      </Layout>
    ),
  },
  {
    path: "/wealth",
    element: (
      <Layout>
        <div>Hello wealth!</div>
      </Layout>
    ),
  },
]);

export default Pages;
