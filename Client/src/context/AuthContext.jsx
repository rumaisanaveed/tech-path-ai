import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as authAPI from "@/services/auth/auth.api";
import { useLogout } from "@/services/auth/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: authAPI.verifyToken,
  //   retry: false,
  //   onSuccess: (data) => setUser(data.user),
  //   onError: () => setUser(null),
  // });

  const logoutMutation = useLogout({
    onSuccess: () => {
      localStorage.removeItem("user");
      setUser(null);
      window.location.replace("/auth/login");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
