import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});
// REQUEST INTERCEPTOR
// Add JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }
    // IMPORTANT
    // Let Axios/browser automatically set the
    // correct Content-Type for FormData.
    //
    // This is required for:
    // multipart/form-data

    if (
      config.data instanceof FormData
    ) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] =
        "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (
      error.response?.status === 401
    ) {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );
    }

    return Promise.reject(error);
  }
);


export default api;