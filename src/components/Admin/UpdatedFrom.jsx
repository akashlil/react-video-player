import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useGetSingalUserQuery,
  useUpdateRegisterUserMutation,
} from "../../features/auth/registrationApiInj";

function UpdatedFromAdmin() {
  const [isLoadingUpdate, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    data: userData,
    isLoading,
    isError,
    isSuccess,
  } = useGetSingalUserQuery(id);

  const [updateRegisterUser] = useUpdateRegisterUserMutation();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await updateRegisterUser(data);

      if (response.error) {
        throw new Error(response.error.message);
      }
      alert("User added successfully!");
      reset();
    } catch (error) {
      alert("Error adding User: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;
  if (!userData) return <div>No videos available.</div>;

  if (isSuccess && userData) {
    return (
      <form className="p-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Your edit form fields go here */}
        <input
          type="text"
          {...register("_id")}
          defaultValue={userData._id}
          className={`form-control d-none hidden`}
          id="_id"
        />
        <div className="form-group mb-2">
          <label htmlFor="editField">Edit Name:</label>
          <input
            type="text"
            className="form-control"
            id="editField"
            name="username"
            {...register("username", {
              required: "Video title is required",
            })}
            defaultValue={userData.username}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="editFieldemail">Edit Email:</label>
          <input
            type="text"
            className="form-control"
            id="editFieldemail"
            name="email"
            {...register("email", {
              required: "email is required",
            })}
            defaultValue={userData.email}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="editFieldemail">Edit Password:</label>
          <input
            type="text"
            className="form-control"
            id="editFieldemail"
            name="email"
            {...register("password", {
              required: "email is required",
            })}
            defaultValue={userData.password}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="editFieldrole">Edit Role:</label>
          <input
            type="text"
            className="form-control"
            id="editFieldrole"
            name="role"
            {...register("role", {
              required: "email is required",
            })}
            defaultValue={userData.role}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={isLoadingUpdate}
        >
          {isLoadingUpdate ? "Adding..." : "Submit"}
        </button>
      </form>
    );
  }
}

export default UpdatedFromAdmin;
