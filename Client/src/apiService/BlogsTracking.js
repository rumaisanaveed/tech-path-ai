import { ADMIN_API_ROUTES, API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ✅accepts params and passes them to the API
export const GetAllBlogs = ({
  page = 1,
  limit = 9,
  search = "",
  tagName = null,
}) => {
  return useQuery({
    queryKey: ["adminBlogs", page, limit, search, tagName], // ✅ Added all params to queryKey
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.BLOGS_TRACKING.GET_ALL_BLOGS;

      // ✅ Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (tagName) params.append("tagName", tagName);

      // ✅ Pass params to API
      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

export const GetBlogTags = () => {
  return useQuery({
    queryKey: ["blogTags"],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.BLOGS_TRACKING.GET_BLOG_TAGS;
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

//Adding blog
export const AddBlog = (blogData) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const url = ADMIN_API_ROUTES.BLOGS_TRACKING.ADD_BLOG;
      const res = await axiosReq(API_MODES.POST, url, blogData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Blog added successfully");

      queryClient.invalidateQueries(["adminBlogs"]);
    },
    onError: (error) => {
      toast.error("Failed to add blog");
    },
  });
};

//==============USER SIDE BLOG QUERIES=================

// Fetch blogs for users with pagination and optional search and tag filtering
export const FetchBlogsForUsers = ({
  page = 1,
  limit = 6,
  search = "",
  tagName = null,
}) => {
  return useQuery({
    queryKey: ["blogsForUsers", page, limit, search, tagName],
    queryFn: async () => {
      const url = API_ROUTES.BLOGS.FETCH_BLOGS_FOR_USERS;

      // Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (tagName) params.append("tagName", tagName);

      // Pass params to API
      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

export const FetchSingleBlogForUsers = (slug) => {
  return useQuery({
    queryKey: ["singleBlog", slug],
    queryFn: async () => {      
      const url = API_ROUTES.BLOGS.FETCH_SINGLE_BLOG(slug);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
}