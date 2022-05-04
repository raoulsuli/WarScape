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
    domain={authSettings.DOMAIN}
    clientId={authSettings.CLIENT_ID}
    redirectUri={window.location.origin}
    audience={authSettings.AUDIENCE}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
