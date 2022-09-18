import { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import { BackTop, Layout, Menu } from 'antd';
import SiteHeader from '../components/atoms/SiteHeader';
import { useRouter } from 'next/router';

const { Sider } = Layout;

type PageProps = {
    dehydratedState?: DehydratedState;
};

type ExtendedAppProps<P = {}> = {
    err?: NextPageContext['err'];
} & AppProps<P>;

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {


    const token = '111';
    const router = useRouter();
    const [queryClient] = useState(() => new QueryClient());

    const [collapsed, setCollapsed] = useState(false);
    const onCollapsed = (collapsed: boolean) => setCollapsed(collapsed);
    const onMenuSelect = ({ key }: { key: string }) => router.push(key).then(() => window.scrollTo(0, 0));


    useEffect(() => {
        if (token) {
            console.log('토큰이 있습니다.');
            router.push('/sample');
        } else {
            console.log('토큰이 없습니다.');
            router.push('/');
        }
    }, [token]);

    if (!token) {
        return (
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Layout>
                        <SiteHeader
                            title='로그인'
                            items={[
                                { label: '로그인', key: '/' },
                                { label: '회원가입', key: '/join' },
                            ]}
                        />
                        <Component {...pageProps} />
                    </Layout>
                </Hydrate>
            </QueryClientProvider>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout hasSider style={{ minHeight: '100vh' }}>
                    <BackTop />
                    <Sider
                        theme="light"
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
                            theme="light"
                            defaultSelectedKeys={[router.pathname]}
                            mode="inline"
                            items={[
                                { label: 'sample', key: '/sample' },
                            ]}
                            onSelect={onMenuSelect}
                        />
                    </Sider>
                    <Component {...pageProps} />
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
