import { useState } from 'react';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';
import { queryClient } from '../react-query/queryClient';
import AuthWrap from '../components/atoms/AuthWrap';

type PageProps = {
    dehydratedState?: DehydratedState;
};

type ExtendedAppProps<P = {}> = {
    err?: NextPageContext['err'];
} & AppProps<P>;

const theme: any = {};
const GlobalStyle = createGlobalStyle`
  div.ant-typography,
  .ant-typography p {
    margin-bottom: 0;
  }
`;

function MyApp({ Component, pageProps }: ExtendedAppProps<PageProps>) {
    const [client] = useState(() => queryClient);

    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={client}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <AuthWrap>
                            <Component {...pageProps} />
                        </AuthWrap>
                    </Hydrate>
                </QueryClientProvider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
