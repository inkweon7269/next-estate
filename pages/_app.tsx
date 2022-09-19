import { useState } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import { queryClient } from '../react-query/queryClient';

type PageProps = {
    dehydratedState?: DehydratedState;
};

type ExtendedAppProps<P = {}> = {
    err?: NextPageContext['err'];
} & AppProps<P>;

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
    const [client] = useState(() => queryClient);

    return (
        <QueryClientProvider client={client}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
