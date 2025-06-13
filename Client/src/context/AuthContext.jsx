// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as authAPI from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: authAPI.verifyToken,
    retry: false,
    onSuccess: (data) => setUser(data.user),
    onError: () => setUser(null),
  });

  const logout = () => {
    setUser(null);
    // optionally make a logout API call
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
