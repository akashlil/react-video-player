// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { setUserRole } from "../features/auth/roleSlice";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/auth/registrationApiInj";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    const resp = await loginUser({ email });
    if (resp?.data) {
      if (resp?.data?.password == password) {
        const token = resp.data.email;
        const role = resp.data.role;
        dispatch(login({ token }));
        dispatch(setUserRole({ role }));
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  };
  return (
    <div className="vh-100">
      <div className="d-flex justify-content-center align-items-center flex-column h-100">
        <div className="col-md-4 border-1 border card p-5">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleLogin}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                // type="password"
                className="form-control col-md-6"
                name="password"
                value={userData.password}
                onChange={handleLogin}
                type={showPassword ? "text" : "password"}
                id="exampleInputPassword1"
              />
              <div
                type="button"
                className="btn btn-sm btn-primary mt-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"} Password
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <Link to="/register" className="text-center">
            Go To Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
