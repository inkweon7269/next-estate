export const numberCommaFormat = (x: any) => {
    if (x === null || x === undefined) {
        return '';
    }

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export enum DateTimeFormat {
    YMD = 'YYYY-MM-DD',
}

export const createQuery = (obj: any) => {
    return Object.entries(obj)
        .map(e => e.join('='))
        .join('&');
};