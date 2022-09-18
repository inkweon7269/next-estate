import React, { FC, useEffect, useState } from 'react';
import { BackTop, Form, Layout, Menu, message } from 'antd';
import SiteHeader from './SiteHeader';
import LabelField from './form/LabelField';
import TextField from './form/TextField';
import NumberField from './form/NumberField';
import CheckboxField from './form/CheckboxField';
import RadioField from './form/RadioField';
import SelectField from './form/SelectField';
import SelectGroupField from './form/SelectGroupField';
import TextAreaField from './form/TextAreaField';
import SwitchField from './form/SwitchField';
import ButtonField from './form/ButtonField';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const { Content, Sider } = Layout;

const SiteSider: FC<any> = ({ children }) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const onCollapsed = (collapsed: boolean) => setCollapsed(collapsed);
    const onMenuSelect = ({ key }: { key: string }) => router.push(key).then(() => window.scrollTo(0, 0));

    useEffect(() => {
        const token = getCookie('asToken');
        if (!token) {
            message.warning('로그아웃 중입니다.');
            router.push('/');
        }
    }, []);

    return (
        <Layout hasSider style={{ minHeight: '100vh' }}>
            <BackTop />
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Menu
                    theme='light'
                    defaultSelectedKeys={[router.pathname]}
                    mode='inline'
                    items={[
                        { label: 'sample', key: '/sample' },
                    ]}
                    onSelect={onMenuSelect}
                />
            </Sider>
            <Content>
                {children}
            </Content>
        </Layout>
    );
};

export default SiteSider;