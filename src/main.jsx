import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="579362235109-87c061mphbrbvttnud4j7cues68tl5g6.apps.googleusercontent.com"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </StrictMode>
);
