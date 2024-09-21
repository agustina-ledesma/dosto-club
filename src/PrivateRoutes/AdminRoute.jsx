import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../auth/AdminContext.jsx';

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAdmin();
  console.log('AdminRoute isAdmin:', isAdmin); // Verifica el valor de isAdmin

  if (isAdmin === false) {
    console.log('Redirecting to /not-authorized');
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default AdminRoute;
