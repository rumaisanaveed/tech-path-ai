import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import { useAuth } from "@/context/AuthContext";
import axiosReq from "@/services/axiosHelper";
import { useQuery } from "@tanstack/react-query";

export const FetchProgressAchievements = ({ careerDomain }) => {
  return useQuery({
    queryKey: ["progressAchievements", careerDomain],
    queryFn: async () => {
      const url =
        API_ROUTES.ACHIEVEMENTS.GET_PROGRESS_ACHIEVEMENTS(careerDomain);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

export const FetchLeaderBoard=({ careerDomain }) => {
  return useQuery({
    queryKey: ["leaderBoard", careerDomain],
    queryFn: async () => {  
      const url = API_ROUTES.ACHIEVEMENTS.GET_LEADERBOARD(careerDomain);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
}

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const url = API_ROUTES.DASHBOARD.GET_DASHBOARD_DATA;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};