export const dealStatus = (status: string) => {
    switch (status) {
        case 'BUY':
            return '매매';
        case 'RENT':
            return '전세';
        default:
            return status;
    }
};