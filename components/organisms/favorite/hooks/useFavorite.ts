import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { axiosInstance, getJWTHeader } from '../../../../axiosInstance';
import { favoriteKeys, queryKeys } from '../../../../react-query/constants';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

export const getFavoriteSimple = async (token) => {
    const { data } = await axiosInstance.get('/favorite/simple', {
        headers: getJWTHeader(token),
    });
    return data;
};

export const getAllFavorite = async (token, params: any) => {
    const { data } = await axiosInstance.get('/favorite', {
        headers: getJWTHeader(token),
        params,
    });

    return data;
};

export const getFavoriteCharts = async (token, params: any) => {
    const { data } = await axiosInstance.get('/favorite/charts', {
        headers: getJWTHeader(token),
        params,
    });

    return data;
};

export const postFavorite = async (data: any) => {
    const token = getCookie('token');
    const res = await axiosInstance.post('/favorite', data, {
        headers: getJWTHeader(token),
    });
    return res;
};

const useFavoriteSimple = (token) => {
    return useQuery([favoriteKeys.simple, token], () => getFavoriteSimple(token), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useFavoriteCharts = (token, params: any) => {
    return useQuery([favoriteKeys.charts, params], () => getFavoriteCharts(token, params),
        {
            onError: error => {
                const content = error instanceof Error ? error.message : 'error connecting to the server';
                message.error(content);
            },
        });
};

const useAllFavorite = (token, params: any) => {
    return useQuery([favoriteKeys.list, params], () => getAllFavorite(token, params), {
        onError: error => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.error(content);
        },
    });
};

const useAddFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation(postFavorite, {
        onError: (error: any, variables, context) => {
            const content = error instanceof Error ? error.message : 'error connecting to the server';
            message.success(content);
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries([favoriteKeys.simple, favoriteKeys.list, favoriteKeys.charts]);
            message.success('즐겨찾기에 추가했습니다.');
        },
    });
};

export { useFavoriteSimple, useAllFavorite, useFavoriteCharts, useAddFavorite };
