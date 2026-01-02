import { ADMIN_API_ROUTES, API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const GetAllCareerDomains = () => {
  return useQuery({
    queryKey: ["careerDomains"],
    queryFn: async () => {
      const url = API_ROUTES.SKILLTRACKING.GET_ALL_CAREER_DOMAINS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

export const GetUserEnrolledDomains = () => {
  return useQuery({
    queryKey: ["enrolledCareerDomains"],
    queryFn: async () => {
      const url = API_ROUTES.SKILLTRACKING.GET_USER_CAREER_DOMAINS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    staleTime: 1000 * 60 * 10, // 10 min cache
    refetchOnWindowFocus: false,
  });
};

export const EnrollInCareerDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domainId) => {
      const url = API_ROUTES.SKILLTRACKING.ENROLL_CAREER_DOMAIN;
      const res = await axiosReq(API_MODES.POST, url, {
        careerDomainId: domainId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Enrolled successfully!");

      queryClient.invalidateQueries({ queryKey: ["enrolledCareerDomains"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Enrollment failed!");
    },
  });
};

// export const UnenrollFromCareerDomain = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (domainId) => {
//       const url = API_ROUTES.SKILLTRACKING.UNENROLL_CAREER_DOMAIN(domainId);
//       const res = await axiosReq(API_MODES.DELETE, url);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data.message || "Unenrolled successfully!");
//       queryClient.invalidateQueries({ queryKey: ["enrolledCareerDomains"] });
//     },
//     onError: (error) => {
//       toast.error(error?.response?.data?.message || "Unenrollment failed!");
//     },
//   });
// };

export const GetSingleCareerDomain = (domainId) => {
  return useQuery({
    queryKey: ["singlecareerDomain", domainId],
    queryFn: async () => {
      const url =
        ADMIN_API_ROUTES.SKILLTRACKING.GET_SINGLE_CAREER_DOMAIN(domainId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

export const ToggleDomainStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domainId) => {
      const url =
        ADMIN_API_ROUTES.SKILLTRACKING.TOGGLE_CAREER_DOMAIN_STATUS(domainId);
      const res = await axiosReq(API_MODES.PATCH, url);
      return res.data;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Domain status updated!");
      queryClient.invalidateQueries(["adminCareerDomains"]);
    },
    onError: (error) => {
      console.error("Error toggling domain status:", error);
    },
  });
};

export const DeleteCareerDomain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (domainId) => {
      const url = ADMIN_API_ROUTES.SKILLTRACKING.DELETE_CAREER_DOMAIN(domainId);
      const res = await axiosReq(API_MODES.DELETE, url);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Domain deleted successfully!");
      queryClient.invalidateQueries(["adminCareerDomains"]);
    },
    onError: (error) => {
      console.error("Error deleting domain:", error);
    },
  });
};

export const CreateCareerDomain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const url = ADMIN_API_ROUTES.SKILLTRACKING.CREATE_CAREER_DOMAIN;
      const res = await axiosReq(API_MODES.POST, url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
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

//-----------------ADMIN Management MODULES-----------------

export const GetAdminAllCareerDomains = () => {
  return useQuery({
    queryKey: ["adminCareerDomains"],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.SKILLTRACKING.GET_ALL_CAREER_DOMAINS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

export const GetAdminAllModulesFromDomain = (domainId, page, limit = 5) => {
  return useQuery({
    queryKey: ["adminModulesFromDomain", domainId, page, limit],
    queryFn: async ({ queryKey }) => {
      const [_key, domainId, page, limit] = queryKey;

      const url = `${ADMIN_API_ROUTES.MODULE_TRACKING.GET_ALL_MODULES(
        domainId
      )}?page=${page}&limit=${limit}`;

      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    keepPreviousData: true,
  });
};


export const CreateAdminModule = (domainId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (domainId, formData) => {
      const url = ADMIN_API_ROUTES.MODULE_TRACKING.CREATE_MODULE(domainId);
      const res = await axiosReq(API_MODES.POST, url, formData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Module created successfully!");
      queryClient.invalidateQueries(["adminModulesFromDomain", domainId]);
    },
    onError: (error) => {
      console.error("Error creating module:", error);
      toast.error(error?.response?.data?.message || "Failed to create module");
    },
  });
};

export const DeleteAdminModule = (domainId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (moduleId, domainId) => {
      const url = `${ADMIN_API_ROUTES.MODULE_TRACKING.DELETE_MODULE(
        moduleId,
        domainId
      )}`;
      const res = await axiosReq(API_MODES.DELETE, url);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Module deleted successfully!");
      queryClient.invalidateQueries(["adminModulesFromDomain", domainId]);
    },
    onError: (error) => {
      console.error("Error deleting module:", error);
      toast.error(error?.response?.data?.message || "Failed to delete module");
    },
  });
};
