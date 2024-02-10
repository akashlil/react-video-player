// RegistrationForm.js
import React, { useState } from "react";
import { useAddRegisterUserMutation } from "../features/auth/registrationApiInj";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [addRegisterUser] = useAddRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { username, email, password, role } = userData;
    try {
      const resp = await addRegisterUser({ username, email, password, role });

      setUserData({
        username: "",
        email: "",
        password: "",
        role: "",
      });

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("Error registering user: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vh-100">
      <div className="d-flex justify-content-center align-items-center flex-column h-100 ">
        <div className="col-md-4 border-1 border card p-5">
          <h2>Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
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
                type="password"
                className="form-control col-md-6"
                name="password"
                value={userData.password}
                onChange={handleLogin}
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3 d-none">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Registion time You default Role user <br />
                admin Changes you role Plase wait
              </label>
              <input
                type="text"
                className="form-control col-md-6"
                name="role"
                disabled
                value={userData.role}
                onChange={handleLogin}
                id="exampleInputPassword1"
              />
            </div>
            {!isLoading && (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </form>
          <Link to="/login" className="text-center">
            Go To Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
