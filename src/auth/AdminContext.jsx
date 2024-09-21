import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext.jsx';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  return (
    <AdminContext.Provider value={{ isAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
