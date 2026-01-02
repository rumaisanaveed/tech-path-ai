import { ADMIN_API_ROUTES, API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// export const GetModuleLessons = (moduleId) =>
//   useQuery({
//     queryKey: ["moduleLessons", moduleId],
//     queryFn: async (moduleId) => {
//       const url = API_ROUTES.LESSONS.GET_MODULE_LESSONS(moduleId);
//       const res = await axiosReq(API_MODES.GET, url);
//       return res.data;
//     },
//     enabled: !!moduleId,
//     refetchOnWindowFocus: false,
//     staleTime: 1000 * 60 * 5,
//   });

// export const GetLessonQuizes = (lessonId, enabled) =>
//   useQuery({
//     queryKey: ["lessonQuizzes", lessonId],
//     queryFn: async (lessonId) => {
//       const url = API_ROUTES.LESSONS.GET_LESSON_QUIZZES(lessonId);
//       const res = await axiosReq(API_MODES.GET, url);
//       return res.data;
//     },
//     enabled: enabled && !!lessonId,
//     refetchOnWindowFocus: false,
//   });

// export const SubmitQuiz = () =>
//   useMutation({
//     mutationFn: async (payload) => {
//       const url = API_ROUTES.LESSONS.SUBMIT_QUIZ_ANSWER;
//       const res = await axiosReq(API_MODES.POST, url, payload);
//       return res.data;
//     },
//   });

//--------------User-------------
export const GetAllUserLessons = (moduleId) => {
  return useQuery({
    queryKey: ["allUserLessons", moduleId],
    queryFn: async () => {
      const url = API_ROUTES.LESSONS.GET_ALL_USER_LESSONS(moduleId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const AddUserLesson = (moduleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const url = API_ROUTES.LESSONS.ADD_USER_LESSON(moduleId);
      console.log("URL", url);

      const res = await axiosReq(API_MODES.POST, url);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Lesson added successfully!");
      queryClient.invalidateQueries(["allUserLessons", moduleId]);
    },
  });
};


export const GetSingleLessonDetails = (lessonId) => {
  return useQuery({
    queryKey: ["singleLessonDetails", lessonId],
    queryFn: async () => {
      const url = API_ROUTES.LESSONS.GET_SINGLE_USER_LESSON(lessonId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    staleTime: 0, //1000 * 60 * 5
    cacheTime: 0,
  });
};

export const UpdateUserLessonStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ lessonId, status, sequence }) => {
      const url = API_ROUTES.LESSONS.UPDATE_LESSON_STATUS(lessonId);
      const res = await axiosReq(API_MODES.PATCH, url, { status, sequence });
      return res.data;
    },
    onSuccess: (data, lessonId) => {
      // Refetch lesson details after a successful status update
      queryClient.invalidateQueries(["singleLessonDetails", lessonId]);
      toast.success(data.message || "Lesson status updated successfully!");
    },
  });
};

//--------------ADMIN-------------

export const GetAllAdminLessonModules = (moduleId) => {
  return useQuery({
    queryKey: ["allModuleLessons", moduleId],
    queryFn: async () => {
      const url =
        ADMIN_API_ROUTES.LESSON_TRACKING.GET_ALL_MODULE_LESSONS_AND_MODULE(
          moduleId
        );
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!moduleId,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, //1000 * 60 * 5
  });
};

export const AddNewAdminLesson = (moduleId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      moduleId,
      title,
      description,
      isMandatory,
      resources,
      learningPoints,
      examples,
    }) => {
      const url = ADMIN_API_ROUTES.LESSON_TRACKING.ADD_LESSON(moduleId);
      const res = await axiosReq(API_MODES.POST, url, {
        title,
        description,
        isMandatory,
        resources: resources || [],
        learningPoints: learningPoints || [],
        examples: examples || [],
      });
      return res.data;
    },
    onSuccess: () => {
      // Refetch lessons after a successful addition
      queryClient.invalidateQueries(["allModuleLessons", moduleId]);
    },
    onError: (error) => {
      console.error("Error adding new lesson:", error);
      toast.error(error?.response?.data?.message || "Failed to add new lesson");
    },
  });
};

export const GetSingleAdminLesson = (lessonId) => {
  return useQuery({
    queryKey: ["singleLesson", lessonId],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.LESSON_TRACKING.GET_SINGLE_LESSON(lessonId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!lessonId,
    refetchOnWindowFocus: false,
    staleTime: 0,
    cacheTime: 0,
  });
};

export const DeleteAdminLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId) => {
      const url = ADMIN_API_ROUTES.LESSON_TRACKING.DELETE_LESSON(lessonId);
      const res = await axiosReq(API_MODES.DELETE, url);
      return res.data;
    },
    onSuccess: (data) => {
      // Refetch lessons after a successful deletion
      queryClient.invalidateQueries(["allModuleLessons"]);
      toast.success(data.message || "Lesson deleted successfully!");
    },
  });
};
