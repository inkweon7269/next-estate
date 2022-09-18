import LoginForm from '../components/organisms/user/LoginForm';
import { Layout, message } from 'antd';
import SiteHeader from '../components/atoms/SiteHeader';
import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('asToken');
        if (token) {
            message.success('자동 로그인 중입니다.');
            router.push('/sample');
        }
    }, []);

    return (
        <Layout>
            <SiteHeader
                title='로그인'
                items={[
                    { label: '로그인', key: '/' },
                    { label: '회원가입', key: '/join' },
                ]}
            />
            <LoginForm />
        </Layout>
    );
};

export default Index;