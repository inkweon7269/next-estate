import { useState } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';

type PageProps = {
    dehydratedState?: DehydratedState;
};

type ExtendedAppProps<P = {}> = {
    err?: NextPageContext['err'];
} & AppProps<P>;

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    )
}

export default MyApp;
