import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000
});
// request interceptor : handling token append to  Headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)


axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response Received");
        return response;
    },

    (error) => {
        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                console.log("Unauthorized Access - Please Login");
            }
            else if (status === 404) {
                console.log("API Not Found");
            }
            else if (status === 500) {
                console.log("Server Error");
            }
            else {
                console.log("Error:", error.response.data);
            }
        }
        else if (error.request) {
            console.log("No Response from Server");
        }
        else {
            console.log("Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;