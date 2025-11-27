import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoadmaps,getDashboardData } from "./roadmap.api";


export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: () => getRoadmaps(),
  });
};

export const useDashboardData = () => {

  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: () => getDashboardData(),
  });
}