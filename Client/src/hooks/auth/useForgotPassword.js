import { useMutation } from "@tanstack/react-query";
import * as authAPI from "../../api/auth.js";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authAPI.forgotPassword,
  });
};
