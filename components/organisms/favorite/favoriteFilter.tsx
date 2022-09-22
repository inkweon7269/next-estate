import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFavoriteCharts, useFavoriteSimple } from './hooks/useFavorite';
import { useFormContext } from 'react-hook-form';
import SelectField from '../../atoms/form/SelectField';
import { Card, Col, Row, Typography } from 'antd';
import { DateTimeFormat, numberCommaFormat } from '../../../utilies/format';
import { getCookie } from 'cookies-next';
import DateRangeField from '../../atoms/form/DateRangeField';
import LabelField from '../../atoms/form/LabelField';
import {
    Bar,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
} from 'recharts';
import StyledTable from '../../atoms/StyledTable';
import dayjs from 'dayjs';
import { dealStatus } from '../../../utilies/statusFunc';
import * as _ from 'lodash';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const FavoriteFilter = ({ params }) => {

    const token = getCookie('aptToken');
    const { control } = useFormContext();

    const router = useRouter();

    const [options, setOptions] = useState([]);
    const [apts, setApts] = useState([]);
    // const [cloneCharts, setCloneCharts] = useState([]);

    const { data: simple, isLoading: LoadingSimple } = useFavoriteSimple(token);
    const { data: charts, isLoading: LoadingCharts } = useFavoriteCharts(token, params);

    useEffect(() => {
        if (simple?.data) {
            const optionArr = simple?.data?.map((item: any) => ({
                label: item.apt.name,
                value: item.apt.id,
            }));

            setOptions(optionArr);
        }
    }, [LoadingSimple]);
    useEffect(() => {
        if (params.ids) {
            const arr = [];
            const idsSort = params.ids
                .split(',')
                .map(item => parseInt(item, 0));

            idsSort.forEach(item => {
                simple?.data?.forEach(jtem => {
                    if (item === jtem.aptId) {
                        arr.push(jtem);
                    }
                });
            });

            setApts(arr.flatMap(item => item.apt));
        } else {
            setApts([]);
        }
    }, [params.ids, simple]);
    /*useEffect(() => {
        setCloneCharts(charts?.data);
    }, [cloneCharts])*/

    const onDate = (range) => {
        if (range[0]) {
            const startDate = range[0], endDate = range[1];
            router.push({
                pathname: router.pathname,
                query: {
                    ...params,
                    startDate,
                    endDate,
                },
            });
        } else {
            router.push({
                pathname: router.pathname,
                query: {
                    ...params,
                    startDate: '',
                    endDate: '',
                },
            });
        }
    };
    const onChange = (data: any) => {
        const ids = data.length ? data.join(',') : '';
        router.push({
            pathname: router.pathname,
            query: {
                ...params,
                page: 1,
                ids,
            },
        });
    };
    const onChangeArea = (id, area) => {
        /*const index = charts.data.findIndex(item => item.id === id);
        const clone = [...cloneCharts];
        const deals = charts.data[index].deals.filter(item => item.area === area);
        const buyDeals = charts.data[index].buyDeals.filter(item => item.area === area);
        const rentDeals = charts.data[index].rentDeals.filter(item => item.area === area);

        clone[index].deals = deals;
        clone[index].buyDeals = buyDeals;
        clone[index].rentDeals = rentDeals;

        setCloneCharts(clone);*/
    };

    // console.log(cloneCharts);

    if (LoadingSimple || LoadingCharts) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <LabelField label='거래기간'>
                <DateRangeField
                    control={control}
                    name='date'
                    onChange={onDate}
                />
            </LabelField>

            <SelectField
                control={control}
                name='ids'
                mode='multiple'
                options={options}
                onChange={onChange}
                style={{ width: '100%', marginBottom: 16 }}
            />


            {charts?.data?.map((item, index) => {
                return (
                    <Row gutter={24} key={index}>
                        <Col key={item.id} span={24}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 15,
                                marginTop: 15,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Title level={5} style={{ marginRight: 15 }}>{item.name}</Title>
                                    <Text type='secondary' style={{ marginRight: 15 }}>{item.address}</Text>
                                    <Text type='secondary' style={{ marginRight: 15 }}>{item.buildAt} 준공</Text>
                                    <Text type='secondary'
                                          style={{ marginRight: 15 }}>{numberCommaFormat(item.people)} 세대</Text>
                                    <Text type='secondary'>{numberCommaFormat(item.group)} 동</Text>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Paragraph style={{ marginRight: 15 }}>매매: <Text
                                        type='success'>{item.buyDeals.length}</Text>건</Paragraph>
                                    <Paragraph style={{ marginRight: 15 }}>전세: <Text
                                        type='success'>{item.rentDeals.length}</Text>건</Paragraph>
                                    {/*
                                    <SelectField
                                        placeholder='평수'
                                        options={item.areas}
                                        style={{ width: 80 }}
                                        onChange={(e) => onChangeArea(item.id, e)}
                                    />
                                    */}
                                </div>
                            </div>
                        </Col>
                        <Col key={item.id} span={10}>
                            <StyledTable
                                size='small'
                                rowKey='id'
                                columns={[
                                    {
                                        title: '거래일',
                                        dataIndex: 'dealDate',
                                        render: (text: any, record: any) => dayjs(text).format(DateTimeFormat.YMD),
                                    },
                                    {
                                        title: '거래 동층',
                                        render: (text: any, record: any) => `${record.dong}동 ${record.floor}층`,
                                    },
                                    { title: '평수', dataIndex: 'area' },
                                    { title: '타입', dataIndex: 'type' },
                                    {
                                        title: '체결가격',
                                        dataIndex: 'money',
                                        render: (text: any, record: any) => numberCommaFormat(text),
                                    },
                                    {
                                        title: '유형',
                                        dataIndex: 'status',
                                        render: (text: any, record: any) => dealStatus(text),
                                    },
                                ]}
                                pagination={{
                                    showSizeChanger: false,
                                    defaultPageSize: 7,
                                }}
                                dataSource={item.deals}
                            />
                        </Col>
                        <Col key={item.id} span={7}>
                            <div style={{ height: 369 }}>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <LineChart
                                        data={item.buyDeals}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 30,
                                            bottom: 5,
                                        }}
                                    >
                                        <XAxis dataKey='dealDate' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type='monotone' dataKey='money' stroke='#8884d8' />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col key={item.id} span={7}>
                            <div style={{ height: 369 }}>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <BarChart
                                        data={item.rentDeals}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 30,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='dealDate' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey='money' fill='#8884d8' />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                    </Row>
                );
            })}
        </>
    );
};

export default FavoriteFilter;