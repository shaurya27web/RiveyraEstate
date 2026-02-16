import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'admin';

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;