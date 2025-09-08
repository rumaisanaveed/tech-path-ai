import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getRoadmaps } from "./roadmap.api";


export const useRoadmaps = (domainId) => {
  return useQuery({
    queryKey: ["roadmaps", domainId],
    queryFn: () => getRoadmaps(domainId),
    enabled: !!domainId,
  });
};