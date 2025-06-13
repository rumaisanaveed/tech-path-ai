import { useMutation } from "@tanstack/react-query";
import * as authAPI from "../../api/auth.js";

export const useSignup = () => {
  return useMutation({
    mutationFn: authAPI.signup,
  });
};