import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import * as authAPI from "../../api/auth.js";

export const useLogin = () => {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

