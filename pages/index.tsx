import LoginForm from '../components/organisms/user/LoginForm';
import { Layout, message } from 'antd';
import SiteHeader from '../components/atoms/SiteHeader';
import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();

    return (
        <>
            <SiteHeader
                title='로그인'
                items={[
                    { label: '로그인', key: '/' },
                    { label: '회원가입', key: '/join' },
                ]}
            />
            <LoginForm />
        </>
    );
};

export default Index;