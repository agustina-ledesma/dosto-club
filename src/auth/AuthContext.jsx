import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const storeUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("https://api-dosto-club-2.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        storeUser(data.user);
        console.log(data);
        setUser({
          email: data.email,
          role: data.role
        });
        
        navigate("/"); 
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      throw new Error("An error occurred while logging in");
    }
  };


  const register = async (email, password) => {
    try {
      const response = await fetch("https://api-dosto-club-2.onrender.com/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        storeUser(data.user);
        setUser(data.user);
        navigate("/"); 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      throw new Error("An error occurred while registering");
    }
  };

  const logout = () => {
    clearStorage();
    setUser(null);
    navigate("/login"); 
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
  
    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);
  
  

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn , register }}>
      {children}
    </AuthContext.Provider>
  );
};
