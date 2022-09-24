import dayjs from 'dayjs';

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

export const dealOrder = (deals, type) => {
    const result = (type === 'desc')
        ? deals.sort((a, b) => dayjs(a.dealDate).isAfter(dayjs(b.dealDate)) ? -1 : 1)
        : deals.sort((a, b) => dayjs(a.dealDate).isAfter(dayjs(b.dealDate)) ? 1 : -1);
    return result;
}

export const dealType = (deals, status) => {
    const result = deals.filter((item) => item.status === status);
    return result;
}

export const rentRate = (rentArr, buyArr) => {
    const rentMax = Math.max(...rentArr.map(jtem => jtem.money));
    const buyMin = Math.min(...buyArr.map(jtem => jtem.money));
    const result = ((rentMax / buyMin) * 100).toFixed(2);

    return result;
}