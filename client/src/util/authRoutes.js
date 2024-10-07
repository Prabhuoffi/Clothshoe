import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const RequiredAuth = ({ children, adminOnly }) => {
  const { token, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default RequiredAuth;
