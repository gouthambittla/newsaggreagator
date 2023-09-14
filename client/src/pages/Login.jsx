import { Box, Button, TextField, Typography,Link } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import "../styles/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: inputs.email,
        password: inputs.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      return null; // Return null in case of an error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
    sendRequest()
      .then((data) => {
        if (data) {
          dispatch(authActions.login({ username: inputs.email }));
          history("/");
        } else {
          // Handle authentication error here, e.g., display an error message
          console.error("Authentication failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="login">
      <form className='form' onSubmit={handleSubmit}>
        <Box className="Box"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          marginTop="100px"
          borderRadius={5}
          
        >
          <Typography
            variant="h3"
            style={{
              marginTop: "30px",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: "black",
              padding: "9px 9px",
              fontSize: "15px",
              marginTop:"20px",
              marginBottom:"20px"
            }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
          <Typography
            variant="p"
            style={{ marginTop: "10px", marginBottom: "20px" }}
          >
            if not registered, please <Link component="button" onClick={() => history("/signup")}>Sign up</Link> first
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Login;
