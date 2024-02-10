import React, { useState } from "react";
import {
  useDeleteRegisterUserMutation,
  useUpdateRegisterUserMutation,
} from "../../features/auth/registrationApiInj";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { removeUserRole } from "../../features/auth/roleSlice";

const AdminList = ({ users }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  /* Modale Open  and edit*/
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  const handleShow = (id) => {
    let userOne = users.filter((user) => user._id === id);
    console.log(userOne[0]);
    const { username, email, password, role } = userOne[0];
    setUserData({
      username,
      email,
      password,
      role,
    });
    setShowModal(true);
  };

  let token = useSelector((state) => state?.authentication?.token);
  console.log(token);
  const [deleteRegisterUser, { isLoading: isLoadingDeleteUser }] =
    useDeleteRegisterUserMutation();
  const handledeleteUser = async ({ id, email }) => {
    if (email == token) {
      const resp = await deleteRegisterUser(id);
      if (resp.data.deletedCount > 0) {
        dispatch(logout());
        dispatch(removeUserRole());
      }
    } else {
      const resp = await deleteRegisterUser(id);
      console.log(resp.data.deletedCount);
    }
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // //////////////
  const [updateRegisterUser] = useUpdateRegisterUserMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
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
  };

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
            {currentUsers.map((user, index) => (
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
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
      {showModal && (
        <div className="modal d-block mt-5" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Form</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
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
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AdminList;
