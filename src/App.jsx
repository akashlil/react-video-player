import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import RegistrationForm from "./pages/Registration";
import { useDispatch } from "react-redux";
import { login } from "./features/auth/authSlice";
import { useEffect } from "react";
import { setUserRole } from "./features/auth/roleSlice";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (token && role) {
      dispatch(setUserRole({ role }));
      dispatch(login({ token }));
    }
  }, [dispatch, token, role]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
