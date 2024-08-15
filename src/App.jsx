import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
// import DeckList from "./decks";
import Deck from "./Deck";
import "./App.css";
// import { GoogleLogin } from "@react-oauth/google";

function App() {
  const location = useLocation();
  const isDeckPage = location.pathname === "/decks";
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <div className="app-content">
        {!isDeckPage && (
          <div className="logoCard">
            <img src="logo.svg" className="logo" alt="logo" width={500} />
            <div className="button-container">
              <button
                className="login-button"
                aria-label="Small button group"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <span>
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}
              </span>
            </div>
          </div>
        )}

        <Routes>{/* <Route path="/decks" element={<DeckList />} /> */}</Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        {/* <Route path="/decks" element={<DeckList />} /> */}
        {/* Uncomment and add other routes as needed */}
        <Route path="/login" element={<Login />} />
        <Route path="/study" element={<Deck />} />
      </Routes>
    </BrowserRouter>
  );
}
