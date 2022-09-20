import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import SiteWrap from './SiteWrap';

const AuthWrap = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const token = getCookie('aptToken');

    useEffect(() => {
        setAuth(token);
    }, [token]);

    return !auth
        ? (
            <>
                {children}
            </>
        ) : (
            <SiteWrap>
                {children}
            </SiteWrap>
        );
};

export default AuthWrap;