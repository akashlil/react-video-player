import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { setUserRole } from "../features/auth/roleSlice";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/auth/registrationApiInj";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const resp = await loginUser({ email: data.email });
      if (resp?.data) {
        if (resp.data.password === data.password) {
          const { email, role } = resp.data;
          dispatch(login({ token: email }));
          dispatch(setUserRole({ role }));
          navigate("/dashboard");
        } else {
          setError("Password does not match. Please try again.");
        }
      } else {
        setError("User not found. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4 border-1 border card p-5">
        <h2 className="mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { required: "Email is required" })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              aria-describedby="emailHelp"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                {...register("password", { required: "Password is required" })}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
