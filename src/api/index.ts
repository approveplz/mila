import axios from "axios";
import { ApiError } from "./api.types";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

const isServer = typeof window === "undefined";

const axiosParams = {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
};

const axiosInstance = axios.create(axiosParams);

export const isApiError = (error: unknown): error is ApiError => {
    return axios.isAxiosError(error);
};

// "/users/v0/sign-up",
// "/auth/v0/token",
const noAuthUrls = [
    /^\/users\/v0\/sign-up$/,
    /^\/users\/v0\/token$/,
    /^\/users\/v0\/user\/[^/]+\/confirm-membership-details$/,
    /^\/users\/v0\/user\/[^/]+\/generate-membership$/
];

axiosInstance.interceptors.request.use(
    async (config: any) => {
        const isNoAuthUrl = noAuthUrls.some((pattern) => pattern.test(config.url));

        if (!isNoAuthUrl) {
            let session;
            let accessToken;

            if (isServer) {
                session = await auth();
                accessToken = session?.user.access;
            } else {
                session = await getSession();
                accessToken = session?.user.access;
            }

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (err: any) => Promise.reject(err),
);

export default axiosInstance;