import React from 'react';
import JoinForm from '../components/organisms/user/JoinForm';
import SiteHeader from '../components/atoms/SiteHeader';
import { Layout } from 'antd';

const Join = () => {
    return (
        <Layout>
            <SiteHeader
                title='회원가입'
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