import React from "react";
import Router from "./router";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>

      <GoogleOAuthProvider clientId="356780920510-ug5t5sesdc7g61piqitc5sumfmc8hs3o.apps.googleusercontent.com">
        
        <Router />

      </GoogleOAuthProvider>

    </Provider>
    
  );
}

export default App;
