import React, {Suspense} from 'react';
import { useRouter } from 'next/router';
import StyledTable from '../../atoms/StyledTable';
import StyledPagination from '../../atoms/StyledPagination';
import { useDeals } from './hooks/useApts';
import dayjs from 'dayjs';
import { DateTimeFormat, numberCommaFormat } from '../../../utilies/format';
import { dealStatus } from '../../../utilies/statusFunc';
import { getCookie } from 'cookies-next';
import { aptToken } from '../../../axiosInstance';

const AptTable = ({ params }) => {
    const router = useRouter();
    const { data, isLoading, isError } = useDeals(aptToken, params);

    const columns = [
        {
            title: '거래일',
            dataIndex: 'dealDate',
            render: (text: any, record: any) => dayjs(text).format(DateTimeFormat.YMD),
        },
        { title: '아파트', dataIndex: ['apt', 'name'] },
        { title: '준공년월', dataIndex: ['apt', 'buildAt'] },
        { title: '세대수', dataIndex: ['apt', 'people'], render: (text: any, record: any) => numberCommaFormat(text) },
        { title: '동수', dataIndex: ['apt', 'group'] },
        { title: '거래 동층', render: (text: any, record: any) => `${record.dong}동 ${record.floor}층` },
        { title: '평수', dataIndex: 'area' },
        { title: '타입', dataIndex: 'type' },
        { title: '체결가격', dataIndex: 'money', render: (text: any, record: any) => numberCommaFormat(text) },
        { title: '거래유형', dataIndex: 'status', render: (text: any, record: any) => dealStatus(text) },
    ];
    const onPaginationChange = (page, limit) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...params,
                page,
                limit,
            },
        });
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <StyledTable
                rowKey='id'
                columns={columns}
                pagination={false}
                dataSource={data?.data?.list}
            />

            <StyledPagination
                page={params.page}
                limit={params.limit}
                total={data?.data?.totalResult}
                onChange={onPaginationChange}
            />
        </>
    );
};

export default AptTable;