import * as React from "react";
import "../../css/login.scss";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/apis/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";

export default function Login() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData))
      console.log(userData)
      navigate("/")
    } catch (error) {
      console.log(error)
      setError("Email/Password was incorrect")
    }
  }

  return (
    <div className="login-container">
      <div className="login-body">
        <div className="login-left-pane">
          <img src="mountains.jpg" />
        </div>
        <div className="login-right-pane">
          <div className="login-title">
            <h4>
              Welcome to <span>roomy</span>
            </h4>
            <p>Find your roomate today</p>
          </div>
          <div className="login-form">
            <p>{error}</p>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
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
              <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                // border: "1px solid green",
              }}
            >
              <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              {/* <TextField
                id="input-with-sx"
                label="Password"
                variant="standard"
              /> */}
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
