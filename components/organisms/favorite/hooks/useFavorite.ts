import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
// import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
// import { queryKeys } from '../../../react-query/constants';
import { message } from 'antd';
import { axiosInstance, getJWTHeader } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { queryClient } from '../../../../react-query/queryClient';
// import { getToken } from '../../../utilies/statusFunc';
// import { queryClient } from '../../../react-query/queryClient';

const getFavoriteSimple = async () => {
    const { data } = await axiosInstance.get('/favorite/simple', {
        headers: getJWTHeader(),
    });
    return data;
};

const getAllFavorite = async (params: any) => {
    const { data } = await axiosInstance.get('/favorite', {
        headers: getJWTHeader(),
        params,
    });

    return data;
};

const postFavorite = async (data: any) => {
    const res = await axiosInstance.post('/favorite', data, {
        headers: getJWTHeader(),
    });
    return res;
};

const useFavoriteSimple = () => {
    return useQuery([queryKeys.favorite], () => getFavoriteSimple(), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useAllFavorite = (params: any) => {
    return useQuery([queryKeys.deals, params], () => getAllFavorite(params), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useAddFavorite = () => {
    return useMutation(postFavorite, {
        onError: (error: any, variables, context) => {
            message.error(error?.response?.data?.message);
        },
        onSuccess: (data, variables, context) => {
            message.success('즐겨찾기에 추가했습니다.');
            queryClient.invalidateQueries([queryKeys.favorite]);
        },
    });
};

export { useFavoriteSimple, useAllFavorite, useAddFavorite };
