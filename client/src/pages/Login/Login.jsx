import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Alert, CircularProgress } from "@mui/material";
import { isEmail } from "validator";
import AuthAction from "../../store/actions/auth.action";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!email || !isEmail(email) || !password) {
      setLoading(false);
      return;
    }

    try {
      await dispatch(AuthAction.login(email, password));
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      setLoading(false);
    }
    // console.log(loading, "loadingloading");
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <Box className="col-md-12">
      <Box className="card card-container">
        <form onSubmit={handleLogin}>
          <Box className="form-group">
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

          <Box className="form-group">
            <TextField
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!password}
              helperText={!password ? "This field is required!" : null}
              label="Password"
            />
          </Box>

          <Box className="form-group">
            <Button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && <CircularProgress size={24} />}
              <span>Login</span>
            </Button>
          </Box>

          {message && (
            <Box className="form-group">
              <Alert severity="error">{message}</Alert>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login;
