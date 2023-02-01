import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Fitness from "../pages/Fitness";
import Home from "../pages/Home";
import Sleep from "../pages/Sleep";
import WorkLife from "../pages/WorkLife";
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
    path: "/work-life",
    element: (
      <Layout>
        <WorkLife />
      </Layout>
    ),
  },
  {
    path: "/fitness",
    element: (
      <Layout>
        <Fitness />
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
