import React, { useState, useEffect } from "react";
import "./Login.css";
import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserType } from "./interfaces/UserType";
import { CreateCustomerType } from "./interfaces/CreateCustomerType";
const clientId =
  "579362235109-87c061mphbrbvttnud4j7cues68tl5g6.apps.googleusercontent.com";
// const server = "https://dokushojo-backend.onrender.com";
const server = import.meta.env.VITE_SERVER;

function Login({}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [information, setInformation] = useState<any>(null); //it is the logged in email
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {}, [newUser]);

  useEffect(() => {
    getAllUserEmails();
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    googleLogout();
  };
  const handleError = () => {
    console.log("Login Failed");
  };

  const handleSuccess = async (credentialResponse: any) => {
    const decoded: UserType = await jwtDecode(credentialResponse?.credential);
    setInformation(decoded.email);
    setIsLoggedIn(true);
    setName(decoded.name);
  };

  const getAllUserEmails = async () => {
    const check = await (await fetch(server + "/")).json();
    let count = 0;
    if (!check) return;
    for (const obj of check) {
      if (information === obj.email_address) {
        count++;
        setUserId(obj.id);
      }
    }
    if (count < 1) {
      createNewAccount();
    }
  };

  const createNewAccount = async () => {
    if (!information) return;
    const customer: CreateCustomerType = {
      email_address: information,
    };
    const request = await fetch(server + "/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    let final = await request.json();
    setUserId(final.id);
  };

  return (
    <div className="loginPage">
      <GoogleOAuthProvider clientId={clientId}>
        <div>
          <div className="logo">
            <img src="logo.svg" className="logo" alt="logo" />
          </div>
          <div className="login-container">
            {!isLoggedIn ? (
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <h3>Choose the Level</h3>
                {information?.picture && (
                  <img
                    className="profile"
                    src={information.picture}
                    alt="Profile"
                  />
                )}
                <p>Name: {name}</p>
                {/* <p>Email: {information}</p> */}
                <button
                  className="btn"
                  onClick={() =>
                    navigate("/decks", { state: { userId: userId } })
                  }
                >
                  User ⚙️
                </button>
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="test-container">
            <h3>Choose a Level</h3>
            <button
              className="testBtn-level1"
              onClick={() => navigate("/study", { state: { userId: userId } })}
            >
              Level 1
            </button>
            <button
              className="testBtn-level2"
              onClick={() => navigate("/study", { state: { userId: userId } })}
            >
              Level 2
            </button>
            <button
              className="testBtn-level3"
              onClick={() => navigate("/study", { state: { userId: userId } })}
            >
              Level 3
            </button>
          </div>
        </div>
      </GoogleOAuthProvider>
      {/* <button className="btn" onClick={() => navigate("/decks")}>
        Click Login
      </button> */}
    </div>
  );
}

export default Login;
