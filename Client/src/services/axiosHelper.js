import axiosInstance from "./axiosInstance";

const axiosReq = async (method, path, postData) => {
  try {
    const isFormData = postData instanceof FormData;

    const config = {
      method,
      url: path,
      data: postData,
      headers: {},
    };

    // 👉 Only set JSON headers if NOT FormData
    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    }

    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosReq;
