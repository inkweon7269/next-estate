import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { axiosInstance } from '../../../../axiosInstance';
import { setCookie } from 'cookies-next';

const postLogin = async (data: any) => {
    const res = await axiosInstance.post('/auth/signin', data);
    return res;
};

const postJoin = async (data: any) => {
    const res = await axiosInstance.post('/auth/signup', data);
    return res;
};

const useLogin = () => {
    return useMutation(postLogin, {
        onError: (error, variables, context) => {
            console.log(error);
            // @ts-ignore
            message.warning(error?.response?.data.message);
        },
        onSuccess: (res, variables, context) => {
            setCookie('aptToken', res.data.data.accessToken);
            message.success('로그인되었습니다.');
        },
    });
};

const useJoin = () => {
    return useMutation(postJoin, {
        onError: (error, variables, context) => {
            console.log(error);
            // @ts-ignore
            message.warning(error?.response?.data.message);
        },
        onSuccess: (data, variables, context) => {
            message.success('회원가입했습니다.');
        },
    });
};

export { useLogin, useJoin };
