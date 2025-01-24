import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const serverurl = "https://ytserver.vercel.app";

export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists in cookies
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${serverurl}/api/check-auth`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.authenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  // Sign out functionality
  const signOut = () => {
    // Clear cookies on the backend
    axios
      .post(`${serverurl}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        // Clear localStorage and update state
        localStorage.clear();
        setIsAuthenticated(false);
      })
      .catch((err) => console.error("Error signing out:", err));
  };

  // Run on component mount
  useEffect(() => {
    checkAuth(); // Check authentication when the app starts
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
