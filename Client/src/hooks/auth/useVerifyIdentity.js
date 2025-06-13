import { useMutation } from "@tanstack/react-query";
import * as authAPI from "../../api/auth.js";


export const useVerifyOtp = (options = {}) => {
  return useMutation({
    mutationFn: authAPI.VerifyIdentity,
    ...options,
  });
};