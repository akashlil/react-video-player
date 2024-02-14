import { useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import { login } from "./features/auth/authSlice";
import { setUserRole } from "./features/auth/roleSlice";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const initializeUser = useCallback(() => {
    if (token && role) {
      dispatch(setUserRole({ role }));
      dispatch(login({ token }));
    }
  }, [dispatch, token, role]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
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
