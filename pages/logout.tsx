import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        deleteCookie('aptToken');
        router.push('/');
    }, []);

    return (
        <div>

        </div>
    );
};

export default Logout;