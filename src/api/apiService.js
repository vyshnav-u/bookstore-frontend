
import axiosInstance from "./axiosInstance";

const apiService = async (
    httpMethod,
    url,
    reqBody,
    reqHeader = {}
) => {
    const token = sessionStorage.getItem("token");

    const reqConfig = {
        method: httpMethod,
        url,
        data: reqBody,
        headers: {
            ...reqHeader,
            ...(token
                ? { Authorization: `Bearer ${token}` }
                : {})
        }
    };

    const response = await axiosInstance(reqConfig);
    return response;
};

export default apiService;
