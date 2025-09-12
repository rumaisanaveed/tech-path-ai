import { useQuery } from "@tanstack/react-query"
import { getAllModulesFromDomain, getUserEnrolledModules } from "./moduleTracking.api";


export const GetUserEnrolledModule = (domainId) => {
  return useQuery({
    queryKey: ["userEnrolledModules", domainId],
    queryFn: () => getUserEnrolledModules(domainId),
    enabled: !!domainId, // only run if domainId exists
    staleTime: 1000 * 60 * 5, // 5 min cache
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("❌ Error fetching enrolled modules:", error);
    },
  })
}

export const GetAllModulesFromDomain = (domainId) => {
  return useQuery({
    queryKey: ["allModulesFromDomain", domainId],
    queryFn: () => getAllModulesFromDomain(domainId),
    enabled: !!domainId, // only run if domainId exists
    staleTime: 1000 * 60 * 5, // 5 min cache
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error("❌ Error fetching all modules from domain:", error);
    }
})}