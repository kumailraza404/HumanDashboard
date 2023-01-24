import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../theme";
import Pages from "./pages";

const MainRouter = () => <RouterProvider router={Pages} />;

export default MainRouter;
