import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  adminCreateDomain,
  adminDeleteDomain,
  adminGetAllCareerDomains,
  adminToggleDomainStatus,
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

//-----------------ADMIN Management-----------------
export const useAdminAllCareerDomains = () => {
  return useQuery({
    queryKey: ["adminCareerDomains"],
    queryFn: adminGetAllCareerDomains,
  });
};

export const useStatusToggleDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminToggleDomainStatus,

    onSuccess: (data) => {
      toast.success(data.message || "Domain status updated!");
      queryClient.invalidateQueries(["adminCareerDomains"]);
    },
    onError: (error) => {
      console.error("Error toggling domain status:", error);
    },
  });
};

export const useDeleteCareerDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (domainId) => adminDeleteDomain(domainId),
    onSuccess: (data) => {
      toast.success(data.message || "Domain deleted successfully!");
      queryClient.invalidateQueries(["adminCareerDomains"]);
    },
    onError: (error) => {
      console.error("Error deleting domain:", error);
    },
  });
};

export const useCreateCareerDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => adminCreateDomain(formData),
    onSuccess: (data) => {
      toast.success(data.message || "Domain created successfully!");
      queryClient.invalidateQueries(["adminCareerDomains"]); // refresh list
    },
    onError: (error) => {
      console.error("Error creating domain:", error);
      toast.error(error.response?.data?.message || "Failed to create domain");
    },
  });
};