import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";

import Router from "./router";
import { store } from "./store/store";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

let persistor = persistStore(store);

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Router />
          </Web3ReactProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
