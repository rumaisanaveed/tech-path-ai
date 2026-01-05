import { API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useQuery } from "@tanstack/react-query";

export const GetRoadmaps = () => {
  return useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const url = API_ROUTES.ROADMAPS.GET_ROADMAPS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch roadmaps:", err),
  });
};

export const GetSingleRoadmap=(id)=>{
  return useQuery({
    queryKey: ["single-roadmap"],
    queryFn: async () => {
      const url = API_ROUTES.ROADMAPS.GET_SINGLE_ROADMAP_DATA(id);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch roadmap:", err),
  });
}

export const GetAllCareer=()=>{
  return useQuery({
    queryKey: ["all-events"],
    queryFn: async () => {
      const url = API_ROUTES.CAREER_EXPLORER.GET_ALL_CAREERS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch events:", err),
  });
}

export const GetSingleCareer = (id)=>{
  return useQuery({
    queryKey: ["single-career"],
    queryFn: async () => {
      const url = API_ROUTES.CAREER_EXPLORER.GET_SINGLE_CAREER_DATA(id);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch roadmap:", err),
  });
}