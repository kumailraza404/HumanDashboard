import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";

import Router from "./router";
import { store } from "./store/store";

let persistor = persistStore(store);

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <Router />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
