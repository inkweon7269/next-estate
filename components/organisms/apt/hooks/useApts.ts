import { useQueries, useQuery } from '@tanstack/react-query';
import { axiosInstance, getJWTHeader } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { message } from 'antd';

export const getAptSimple = async (token) => {
    const { data } = await axiosInstance.get('/apt/simple', {
        headers: getJWTHeader(token),
    });
    return data;
};

export const getAptDeals = async (token, params: any) => {
    const { data } = await axiosInstance.get('/apt/deals', {
        headers: getJWTHeader(token),
        params,
    });

    return data;
};

const useAptSimple = (token) => {
    return useQuery([queryKeys.apt, token], () => getAptSimple(token), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useDeals = (token, params: any) => {
    return useQuery([queryKeys.deals, token, params], () => getAptDeals(token, params), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useAptDeals = (token, params: any) => {
    return useQueries({
        queries: [
            { queryKey: [queryKeys.apt], queryFn: () => getAptSimple(token) },
            { queryKey: [queryKeys.deals], queryFn: () => getAptDeals(token, params) },
        ],
    });
};

export { useAptSimple, useDeals, useAptDeals };
