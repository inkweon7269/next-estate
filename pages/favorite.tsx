import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import cookies from 'next-cookies';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { queryKeys } from '../react-query/constants';
import { getAllFavorite } from '../components/organisms/favorite/hooks/useFavorite';
import { useForm, FormProvider } from 'react-hook-form';
import SiteHeader from '../components/atoms/SiteHeader';
import { Layout } from 'antd';
import Pan from '../components/atoms/Pan';
import FavoriteTable from '../components/organisms/favorite/favoriteTable';
import FavoriteFilter from '../components/organisms/favorite/favoriteFilter';

const { Content } = Layout;

const Favorite = ({ params }) => {
    const form = useForm({
        defaultValues: {
            params,
            ids: params.ids ? params.ids.split(',').map(item => parseInt(item, 0)) : [],
        },
    });

    return (
        <FormProvider {...form}>
            <SiteHeader
                title='즐겨찾기'
            />

            <Content style={{ padding: 20 }}>
                <Pan>
                    <FavoriteFilter params={params} />
                </Pan>

                <Pan>
                    <FavoriteTable params={params} />
                </Pan>
            </Content>
        </FormProvider>
    );
};

export default Favorite;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const allCookies = cookies(context);
    const token = allCookies.aptToken;

    const queryClient = new QueryClient();
    const params = {
        page: context.query.page ? context.query.page : 1,
        limit: context.query.limit ? context.query.limit : 50,
        ids: context.query.ids ? context.query.ids : '',
    };

    await queryClient.prefetchQuery([queryKeys.favorite, params], () => getAllFavorite(token, params));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            params,
        },
    };
};