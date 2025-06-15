import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as authAPI from "@/services/auth/auth.api";
import { useLogout } from "@/services/auth/auth.service";

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

  const logoutMutation = useLogout({
    onSuccess: () => {
      setUser(null);
      window.location.replace("/auth/login");
    },
    onError: () => {
      console.error("Logout failed");
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
