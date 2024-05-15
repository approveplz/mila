import axios from "axios";
import { ApiError } from "./api.types";

// API interceptors for modifying request to be send to backend
const axiosParams = {
    // Set different base URL based on the environment
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

export const isApiError = (error: unknown): error is ApiError => {
    return axios.isAxiosError(error);
};

// axiosInstance.interceptors.request.use(
//     (config: any) => {
//         if (isServer) {
//             config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzODkzMjI0LCJpYXQiOjE2OTM1NjQyMzksImp0aSI6ImY3MWRlMDUxYjFlMjQ5NmFhNzAwYWRiYTkzM2IyZmRmIiwidXNlcl9pZCI6InVzcl80N1h2OWs3QkVBVko1In0.P8NWBJR3yV5xesO1I8fQb9Q54G4_btyWsqgWRNpnwTg`;
//         } else {
//             const {
//                 auth: { access: accessToken },
//             } = store.getState();

//             if (accessToken) {
//                 config.headers.Authorization = `Bearer ${accessToken}`;
//             }
//         }

//         return config;
//     },
//     (err: any) => Promise.reject(err),
// );

export default axiosInstance;