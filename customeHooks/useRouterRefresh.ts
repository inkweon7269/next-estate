import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useRouterRefresh(r?: string) {
    const { replace, push, asPath } = useRouter();
    if (r === 'r') {
        return replace(asPath, undefined, { scroll: false });
    } else {
        return push(asPath, undefined, { scroll: false });
    }
}