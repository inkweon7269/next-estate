import axios, { AxiosRequestConfig } from 'axios';
import configs from '../config';
import { getCookie } from 'cookies-next';

export const getJWTHeader = (token): Record<string, string> => {
    return { Authorization: `Bearer ${token}` };
};

const config: AxiosRequestConfig = { baseURL: configs?.baseUrl, withCredentials: true };
export const axiosInstance = axios.create(config);
