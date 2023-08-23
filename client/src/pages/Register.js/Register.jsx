import "./register.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      name: name,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={handleRegister}>
        <label>EMAIL</label>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>YOUR NAME</label>
        <input
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setName(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Create account </button>
        <div className="login-register">
          Bạn đã có tài khoản?
          <Link className="login-register-link" to="/login">
            Login now{" "}
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
