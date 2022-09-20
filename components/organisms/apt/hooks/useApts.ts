import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { axiosInstance, getJWTHeader } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { message } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import { queryClient } from '../../../../react-query/queryClient';

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

export const getCrawling = async () => {
    const { data } = await axiosInstance.get('/crawling');
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
            { queryKey: [queryKeys.apt, token], queryFn: () => getAptSimple(token) },
            { queryKey: [queryKeys.deals, token], queryFn: () => getAptDeals(token, params) },
        ],
    });
};

const useCrawling = () => {
    return useMutation(getCrawling, {
        onError: (error, variables, context) => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.success(content);
        },
        onSuccess: (res, variables, context) => {
            message.success('정보를 업데이트했습니다.');
            queryClient.invalidateQueries([queryKeys.deals]);
        },
    });
};

export { useAptSimple, useDeals, useAptDeals, useCrawling };
