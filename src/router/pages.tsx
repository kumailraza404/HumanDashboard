import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Fitness from "../pages/Fitness";
import Home from "../pages/Home";
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
    path: "/wealth",
    element: (
      <Layout>
        <Wealth />
      </Layout>
    ),
  },
  {
    path: "/privacy",
    element: (
      <Layout>
        <Text sx={{ margin: "20px" }}>
          Welcome to blah blah This is an open source React app developed by
          Team at HumanDashboard. The source code is available on GitHub under
          the MIT license;. As an avid user myself, I take privacy very
          seriously. I know how irritating it is when apps collect your data
          without your knowledge. I hereby state, to the best of my knowledge
          and belief, that I have not programmed this app to collect any
          personally identifiable information. All data (app preferences (like
          theme, etc.) and alarms) created by the you (the user) is stored on
          your device only, and can be simply erased by clearing the app's data
          or uninstalling it. ### Explanation of permissions requested in the
          app
        </Text>
        <Text sx={{ margin: "20px" }}>
          Following are the permissions required by the app. Although it is very
          simple to understand.
          "https://www.googleapis.com/auth/fitness.activity.read": This
          permission is required to get fitness data (i.e biking, walking),
          "https://www.googleapis.com/auth/calendar.readonly": This permission
          is required to get calendar data (i.e calculating number of hours into
          working),
          "https://www.googleapis.com/auth/calendar.settings.readonly"": This
          permission is required to get calendar data (i.e calculating number of
          hours into working), "https://www.googleapis.com/auth/calendar"": This
          permission is required to get calendar data (i.e calculating number of
          hours into working),
          "https://www.googleapis.com/auth/fitness.sleep.read"": This permission
          is required to get sleep data (i.e calculating number of hours into
          sleep), "https://www.googleapis.com/auth/fitness.nutrition.read"":
          This permission is required to get nutriton data (i.e calculating
          nutrional data),
          "https://www.googleapis.com/auth/fitness.location.read"": This
          permission is required to get calendar data (i.e calculating number of
          steps total), If you find any security vulnerability that has been
          inadvertently caused by me, or have any question regarding how the app
          protectes your privacy, please send me an email or post a discussion
          on GitHub, and I will surely try to fix it/help you.
        </Text>
      </Layout>
    ),
  },
]);

export default Pages;
