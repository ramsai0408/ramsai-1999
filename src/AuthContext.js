import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return localStorage.getItem('isLoggedIn') ==='true';
  });

  const login = () => {
    setIsLoggedIn(true);
    const expirationTime = Date.now() + 60000;
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('expirationTime', expirationTime.toString());

  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn')
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
