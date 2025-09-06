import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  enrollInCareerDomain,
  getAllCareerDomains,
  getUserEnrolledDomains,
} from "./skillTracking.api";

// GET all career domains
export const useAllCareerDomains = () => {
  return useQuery({
    queryKey: ["careerDomains"],
    queryFn: getAllCareerDomains,
  });
};

// GET all enrolled domains
export const useUserEnrolledDomains = () => {
  return useQuery({
    queryKey: ["enrolledCareerDomains"],
    queryFn: getUserEnrolledDomains,
    staleTime: 1000 * 60 * 10, // 10 min cache
    refetchOnWindowFocus: false,
  });
};

// POST enroll in a career domain
export const useEnrollInCareerDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollInCareerDomain,
    onSuccess: (data) => {
      toast.success(data.message || "Enrolled successfully!");

      // 🔑 FIX: Refresh enrolled domains automatically
      queryClient.invalidateQueries({ queryKey: ["enrolledCareerDomains"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Enrollment failed!");
    },
  });
};
