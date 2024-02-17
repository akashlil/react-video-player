import React, { useCallback, useState } from "react";
import {
  useDeleteRegisterUserMutation,
  useUpdateRegisterUserMutation,
} from "../../features/auth/registrationApiInj";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { removeUserRole } from "../../features/auth/roleSlice";
import Paginate from "../Paginate/Paginate";
import Modal from "../Modal/Modal";

const AdminList = ({ users }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.authentication?.token);
  const { pagination, paginationList: usersList } = Paginate(users);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    _id: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => setShowModal(false), []);

  const handleShow = useCallback(
    (id) => {
      const user = users.find((user) => user._id === id);
      setUserData(user);
      setShowModal(true);
    },
    [users]
  );

  const [deleteRegisterUser] = useDeleteRegisterUserMutation();
  const [updateRegisterUser] = useUpdateRegisterUserMutation();

  const handledeleteUser = useCallback(
    async ({ id, email }) => {
      const resp = await deleteRegisterUser(id);
      if (resp.data.deletedCount > 0) {
        if (email === token) {
          dispatch(logout());
          dispatch(removeUserRole());
        }
      }
    },
    [deleteRegisterUser, dispatch, token]
  );

  const handleLogin = useCallback((e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const resp = await updateRegisterUser(userData);
      if (resp) {
        setUserData({
          username: "",
          email: "",
          password: "",
          role: "",
        });
        handleClose();
      }
    },
    [updateRegisterUser, userData, handleClose]
  );

  return (
    <div>
      <h2>User List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="d-flex">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleShow(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() =>
                      handledeleteUser({ id: user._id, email: user.email })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination}
      {
        <Modal handleClose={handleClose} showModal={showModal}>
          <form onSubmit={handleSubmit}>
            {/* Your edit form fields go here */}
            <div className="form-group mb-2">
              <label htmlFor="editField">Edit Name:</label>
              <input
                type="text"
                className="form-control"
                id="editField"
                name="username"
                value={userData?.username}
                onChange={handleLogin}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="editFieldemail">Edit Email:</label>
              <input
                type="text"
                className="form-control"
                id="editFieldemail"
                name="email"
                value={userData?.email}
                onChange={handleLogin}
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="editFieldrole">Edit Role:</label>
              <input
                type="text"
                className="form-control"
                id="editFieldrole"
                name="role"
                value={userData?.role}
                onChange={handleLogin}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm mt-3">
              Submit
            </button>
          </form>
        </Modal>
      }
    </div>
  );
};

export default AdminList;
