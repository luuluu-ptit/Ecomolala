import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, TextField, Button, Alert } from "@mui/material";
import { isEmail } from "validator";
import AuthAction from "../../store/actions/auth.action";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    setSuccessful(false);

    if (
      !username ||
      username.length < 3 ||
      username.length > 20 ||
      !email ||
      !isEmail(email) ||
      !password ||
      password.length < 6 ||
      password.length > 40
    ) {
      return;
    }

    try {
      await dispatch(AuthAction.register({ name: username, email, password }));
      setSuccessful(true);
    } catch (error) {
      setSuccessful(false);
    }
  };

  return (
    <div class="modal">
      <Box className="col-md-12 register-container">
        <Box className="card ">
          <h2 className="header-register">SIGN UP</h2>
          <form className="form-group-register" onSubmit={handleRegister}>
            {!successful && (
              <div>
                <Box className="form-group form-register-item">
                  <TextField
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={
                      !username || username.length < 3 || username.length > 20
                    }
                    helperText={
                      !username
                        ? "This field is required!"
                        : username.length < 3 || username.length > 20
                        ? "The username must be between 3 and 20 characters."
                        : null
                    }
                    label="Username"
                  />
                </Box>

                <Box className="form-group form-register-item">
                  <TextField
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!email || !isEmail(email)}
                    helperText={
                      !email
                        ? "This field is required!"
                        : !isEmail(email)
                        ? "This is not a valid email."
                        : null
                    }
                    label="Email"
                  />
                </Box>

                <Box className="form-group form-register-item">
                  <TextField
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={
                      !password || password.length < 6 || password.length > 40
                    }
                    helperText={
                      !password
                        ? "This field is required!"
                        : password.length < 6 || password.length > 40
                        ? "The password must be between 6 and 40 characters."
                        : null
                    }
                    label="Password"
                  />
                </Box>

                <Box className="form-group">
                  <Button type="submit" className="btn btn-primary btn-block">
                    <span className="text-black">Sign Up</span>
                  </Button>
                </Box>
                <div className="auth-form__controls">
                  <Button
                    // className="btn btn--primary"
                    component={Link}
                    to="/login"
                  >
                    <span className="text-white">
                      You have not been account ? Login
                    </span>{" "}
                    {/* Login */}
                  </Button>
                </div>
              </div>
            )}

            {message && (
              <Box className="form-group">
                <Alert severity={successful ? "success" : "error"}>
                  {message}
                </Alert>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
