import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Usage:
 * <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
 *
 * If user is not logged in, redirect to /login (with optional ?next=...).
 */
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    // user null means not loaded or not authenticated.
    // Could add a loading spinner while profile fetch completes.
    return <Navigate to={`/login`} replace />;
  }

  return children;
};

export default PrivateRoute;
