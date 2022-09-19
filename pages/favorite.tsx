import React, { useEffect } from 'react';

const Favorite = () => {
    useEffect(() => {
        console.log('Favorite');
    }, []);

    return (
        <div>
            <h1>Favorite</h1>
        </div>
    );
};

export default Favorite;