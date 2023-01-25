import React from "react";
import Router from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <Router />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
