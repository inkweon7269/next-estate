import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { axiosInstance, getJWTHeader } from '../../../../axiosInstance';
import { aptKeys, queryKeys } from '../../../../react-query/constants';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

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
    return useQuery([aptKeys.simple, token], () => getAptSimple(token), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useDeals = (token, params: any) => {
    return useQuery([aptKeys.deals, token, params], () => getAptDeals(token, params), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useAptDeals = (token, params: any) => {
    return useQueries({
        queries: [
            { queryKey: [aptKeys.simple, token], queryFn: () => getAptSimple(token) },
            { queryKey: [aptKeys.deals, token], queryFn: () => getAptDeals(token, params) },
        ],
    });
};

const useCrawling = () => {
    const queryClient = useQueryClient();
    return useMutation(getCrawling, {
        onError: (error, variables, context) => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.success(content);
        },
        onSuccess: (res, variables, context) => {
            message.success('정보를 업데이트했습니다.');
            queryClient.invalidateQueries([aptKeys.deals]);
        },
    });
};

export { useAptSimple, useDeals, useAptDeals, useCrawling };
