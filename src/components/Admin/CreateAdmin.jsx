import React, { useState } from "react";
import { useAddRegisterUserMutation } from "../../features/auth/registrationApiInj";

export default function CreateAdmin() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
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
    } catch (error) {
      alert("Error registering user: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="border-1 border card p-5 w-100">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleLogin}
              className="form-control"
              id="exampleInputName"
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
          <div className="mb-3">
            <label htmlFor="exampleInputRole" className="form-label me-2">
              Role Set :
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                onChange={handleLogin}
                id="inlineRadio2"
                value="admin"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Admin
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                onChange={handleLogin}
                id="inlineRadio4"
                value="user"
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                User
              </label>
            </div>
          </div>

          {!isLoading && (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
