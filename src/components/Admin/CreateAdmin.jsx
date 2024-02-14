import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddRegisterUserMutation } from "../../features/auth/registrationApiInj";

export default function CreateAdmin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addRegisterUser] = useAddRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false); // State to track whether to show password
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await addRegisterUser(data);
      if (response.error) {
        throw new Error(response.error.message);
      }
      alert("User registered successfully!");
      reset(); // Reset the form after successful registration
    } catch (error) {
      alert("Error registering user: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-5">
      <div className="border-1 border card p-5 w-100">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Input */}
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              {...register("username", { required: true })}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              id="exampleInputName"
            />
            {errors.username && (
              <div className="invalid-feedback">
                Please enter your full name
              </div>
            )}
          </div>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="exampleInputEmail1"
            />
            {errors.email && (
              <div className="invalid-feedback">
                Please enter a valid email address
              </div>
            )}
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                {...register("password", { required: true })}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="exampleInputPassword1"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback">Please enter a password</div>
            )}
          </div>
          {/* Role Selection */}
          <div className="mb-3">
            <label htmlFor="exampleInputRole" className="form-label me-2">
              Role Set :
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                {...register("role")}
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
                {...register("role")}
                id="inlineRadio4"
                value="user"
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                User
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Adding..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
