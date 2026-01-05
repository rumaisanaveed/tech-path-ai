import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const GetUserEnrolledModule = (domainId, page = 1, perPage = 6) => {
  return useQuery({
    queryKey: ["userEnrolledModules", domainId, page],
    queryFn: async () => {
      const url = `${API_ROUTES.SKILLMODULE.GET_USER_ENROLLED(
        domainId
      )}?page=${page}&perPage=${perPage}`;

      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!domainId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const ChangeModuleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ moduleId, status }) => {
      const url = API_ROUTES.SKILLMODULE.CHANGE_MODULE_STATUS(moduleId);
      console.log("🔄 Changing module status:", { moduleId, status, url });

      const res = await axiosReq(API_MODES.PATCH, url, { status });

      return res.data;
    },

    onSuccess: (data) => {
      toast.success(data?.message || "Module status updated");

      queryClient.invalidateQueries({
        queryKey: ["userEnrolledModules"],
      });
    },

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Failed to update module status";

      toast.error(message);

      console.error("❌ Error changing module status:", error);
    },
  });
};


export const useModuleProject = (moduleId) => {
  return useQuery({
    queryKey: ["moduleProject", moduleId], // ✅ include moduleId
    enabled: !!moduleId, // ✅ don't run without moduleId
    queryFn: async () => {
      const url = API_ROUTES.DASHBOARD.GET_MODULE_PROJECTS(moduleId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};


// export const GetAllModulesFromDomain = (domainId) => {
//   return useQuery({
//     queryKey: ["allModulesFromDomain", domainId],
//     queryFn: async () => {
//       const url = API_ROUTES.MODULES.GET_ALL_MODULES_FROM_DOMAIN(domainId);
//       const res = await axiosReq(API_MODES.GET, url);
//       return res.data;
//     },
//     enabled: !!domainId,
//     staleTime: 1000 * 60 * 5,
//     refetchOnWindowFocus: false,
//     onError: (error) => {
//       console.error("❌ Error fetching all modules from domain:", error);
//     },
//   });
// };
