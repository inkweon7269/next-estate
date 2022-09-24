import React, { FC, useEffect, useState } from 'react';
import { BackTop, Layout, Menu, message } from 'antd';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import styled from 'styled-components';

const { Content, Sider } = Layout;

const SiteWrap: FC<any> = ({ children }) => {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const onCollapsed = (collapsed: boolean) => setCollapsed(collapsed);
    const onMenuSelect = ({ key }: { key: string }) => router.push(key).then(() => window.scrollTo(0, 0));

    return (
        <Layout hasSider style={{ minHeight: '100vh' }}>
            <BackTop />
            <_StyledSider
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
                <_StyledMenu
                    theme='light'
                    defaultSelectedKeys={[router.pathname]}
                    mode='inline'
                    items={[
                        { label: 'sample', key: '/sample' },
                        { label: '아파트 정보', key: '/apt' },
                        { label: '즐겨찾기', key: '/favorite' },
                        { label: 'KB 부동산', key: '/kb' },
                    ]}
                    onSelect={onMenuSelect}
                />
            </_StyledSider>
            <Content>
                {children}
            </Content>
        </Layout>
    );
};

export default SiteWrap;

const _StyledSider = styled(Sider)`
  .ant-layout-sider-trigger {
    border-right: 1px solid #f0f0f0;
  }
`;

const _StyledMenu = styled(Menu)`
  height: 100%;
`;