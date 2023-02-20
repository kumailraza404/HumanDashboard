import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Fitness from "../pages/Fitness";
import Home from "../pages/Home";
import Privacy from "../pages/Privacy";
import Sleep from "../pages/Sleep";
import Wealth from "../pages/Wealth";
import WorkLife from "../pages/WorkLife";
import { Text } from "../styles";
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
]);

export default Pages;
