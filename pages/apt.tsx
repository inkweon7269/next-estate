import React, { useEffect } from 'react';
import SiteWrap from '../components/atoms/SiteWrap';
import SiteHeader from '../components/atoms/SiteHeader';
import { Layout } from 'antd';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { queryKeys } from '../react-query/constants';
import { getAptDeals, getAptSimple } from '../components/organisms/apt/hooks/useApts';
import { useRouter } from 'next/router';
import { useForm, FormProvider } from 'react-hook-form';
import AptTable from '../components/organisms/apt/AptTable';
import Pan from '../components/atoms/Pan';
import AptFilter from '../components/organisms/apt/AptFilter';
import { getCookie } from 'cookies-next';
import cookies from 'next-cookies';


const { Content } = Layout;

const Apt = ({ params }) => {

    const form = useForm({
        defaultValues: {
            params,
        },
    });

    return (
        <FormProvider {...form}>
            <SiteHeader
                title='아파트 정보'
            />

            <Content style={{ padding: 20 }}>
                <Pan>
                    <AptFilter params={params} />
                </Pan>

                <Pan>
                    <AptTable params={params} />
                </Pan>
            </Content>
        </FormProvider>
    );
};

export default Apt;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const allCookies = cookies(context);
    const token = allCookies.aptToken;

    const queryClient = new QueryClient();
    const params = {
        page: context.query.page ? context.query.page : 1,
        limit: context.query.limit ? context.query.limit : 50,
        apt: context.query.apt ? context.query.apt : '',
        // search: context.query.search ? context.query.search : '',
    };

    // await queryClient.prefetchQuery([queryKeys.apt], () => getAptSimple());
    await queryClient.prefetchQuery([queryKeys.apt, token, params], () => getAptDeals(token, params));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            params,
        },
    };
};