import * as React from "react";
import "../../css/login.scss";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../store/apis/apiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const accessToken = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials(accessToken));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Email/Password was incorrect");
    }
  };

  return (
    <div className="login-container">
      <div className="login-body">
        <div className="login-left-pane">
          <img src="apartments.jpg" alt="login_image" />
          {/* <div className="overlay-text">
            <p>Already Registered?</p>
            <div className="signup-button">
              <Button
                style={{
                  borderRadius: 5,
                  backgroundColor: "#21b6ae",
                  padding: "9px 18px",
                  fontSize: "16px",
                }}
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div> */}
        </div>
        <div className="login-right-pane">
          <div className="login-title">
            <span>roomy</span>
            <p>Find your roomate today</p>
          </div>
          <div className="login-form">
            <p>{error}</p>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px"
                // border: "1px solid green",
              }}
            >
              <AccountCircle
                sx={{
                  color: "action.active",
                  mr: 1,
                  my: 0.5,
                }}
              // size={"medium"}
              />
              {/* <TextField
                id="input-with-sx"
                label="email"
                variant="standard"
              /> */}
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: "20px"
                // border: "1px solid green",
              }}
            >
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {/* <TextField
                id="input-with-sx"
                label="Password"
                variant="standard"
              /> */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </div>
          <div className="login-button">
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: "#21b6ae",
                padding: "9px 18px",
                fontSize: "16px",
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </div>
          <div className="login__switch">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}