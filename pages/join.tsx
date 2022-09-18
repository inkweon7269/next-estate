import React, { useEffect } from 'react';
import JoinForm from '../components/organisms/user/JoinForm';
import SiteHeader from '../components/atoms/SiteHeader';
import { Layout, message } from 'antd';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const Join = () => {
    const router = useRouter();

    useEffect(() => {
        const token = getCookie('asToken');
        if (token) {
            message.success('자동 로그인 중입니다.');
            router.push('/sample');
        }
    }, [])

    return (
        <Layout>
            <SiteHeader
                title='로그인'
                items={[
                    { label: '로그인', key: '/' },
                    { label: '회원가입', key: '/join' },
                ]}
            />
            <JoinForm />
        </Layout>
    );
};

export default Join;