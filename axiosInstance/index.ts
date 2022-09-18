import axios, { AxiosRequestConfig } from 'axios';
import configs from '../config';

export const getJWTHeader = (): Record<string, string> => {
    return { Authorization: `Bearer ${localStorage.getItem('acToken')}` };
};

const config: AxiosRequestConfig = { baseURL: configs?.baseUrl, withCredentials: true };
export const axiosInstance = axios.create(config);
