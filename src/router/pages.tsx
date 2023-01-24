import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../theme";

const Pages = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <div>Hello world!</div>,
      </Layout>
    ),
  },
  {
    path: "/sleep",
    element: (
      <Layout>
        <div>Hello sleep</div>,
      </Layout>
    ),
  },
  {
    path: "/work",
    element: (
      <Layout>
        <div>Hello work!</div>,
      </Layout>
    ),
  },
  {
    path: "/fitness",
    element: (
      <Layout>
        <div>Hello fitness!</div>,
      </Layout>
    ),
  },
  {
    path: "/nutrition",
    element: (
      <Layout>
        <div>Hello nutrition!</div>,
      </Layout>
    ),
  },
  {
    path: "/happiness",
    element: (
      <Layout>
        <div>Hello happiness!</div>,
      </Layout>
    ),
  },
  {
    path: "/wealth",
    element: (
      <Layout>
        <div>Hello wealth!</div>,
      </Layout>
    ),
  },
]);

export default Pages;
