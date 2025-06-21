import axiosInstance from "./axiosInstance";

const axiosReq = async (method, path, postData) => {
  try {
    const config = {
      method,
      url: path,
      data: postData,
    };

    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default axiosReq;
