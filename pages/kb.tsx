import React from 'react';
import SiteHeader from '../components/atoms/SiteHeader';
import { Layout, Tabs } from 'antd';
import Pan from '../components/atoms/Pan';

const { Content } = Layout;

const Kb = () => {

    const items = [
        {
            label: '소득 대비 주택가격',
            key: 'item-1',
            children: <iframe
                width='100%'
                height='1200'
                src='https://data.kbland.kr/kbstats/pir'
            />
        },
        {
            label: '투자 테이블',
            key: 'item-2',
            children: <iframe
                width='100%'
                height='1200'
                src='https://data.kbland.kr/kbstats/investment-table'
            />
        },
        {
            label: '전세가율',
            key: 'item-3',
            children: <iframe
                width='100%'
                height='1200'
                src='https://data.kbland.kr/kbstats/wmh?tIdx=HT03&tsIdx=aptSaleVsRentRatio'
            />
        },
    ];

    return (
        <>
            <SiteHeader
                title='KB 부동산'
            />

            <Content style={{ padding: 20 }}>
                <Pan>
                    <Tabs items={items} />
                </Pan>
            </Content>
        </>
    );
};

export default Kb;