import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { authSettings } from "./utils/authSettings";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Auth0Provider
    domain={authSettings.domain}
    clientId={authSettings.clientId}
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
