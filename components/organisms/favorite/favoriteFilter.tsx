import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFavoriteCharts, useFavoriteSimple } from './hooks/useFavorite';
import { useFormContext } from 'react-hook-form';
import SelectField from '../../atoms/form/SelectField';
import { Card, Col, Row, Typography } from 'antd';
import { numberCommaFormat } from '../../../utilies/format';
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

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const FavoriteFilter = ({ params }) => {

    const token = getCookie('aptToken');
    const { control } = useFormContext();

    const router = useRouter();
    const [options, setOptions] = useState([]);
    const [apts, setApts] = useState([]);

    const { data, isLoading } = useFavoriteSimple(token);
    const { data: charts, isLoading: LoadingCharts } = useFavoriteCharts(token, params);

    useEffect(() => {
        if (data?.data) {
            const optionArr = data?.data?.map((item: any) => ({
                label: item.apt.name,
                value: item.apt.id,
            }));

            setOptions(optionArr);
        }
    }, [isLoading]);
    useEffect(() => {
        if (params.ids) {
            const arr = [];
            const idsSort = params.ids
                .split(',')
                .map(item => parseInt(item, 0));

            idsSort.forEach(item => {
                data?.data?.forEach(jtem => {
                    if (item === jtem.aptId) {
                        arr.push(jtem);
                    }
                });
            });

            setApts(arr.flatMap(item => item.apt));
        } else {
            setApts([]);
        }
    }, [params.ids, data]);

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

    if (isLoading || LoadingCharts) {
        return <h1>Loading...</h1>;
    }

    console.log(charts);

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


            {charts.data?.map((item, index) => {
                return (
                    <Row gutter={16}>
                        <Col key={item.id} span={8}>
                            <Card
                                title={item.name}
                                actions={[
                                    <Paragraph key={index}>
                                        <Text>{item.buildAt} 준공</Text>
                                    </Paragraph>,
                                    <Paragraph key={index}>
                                        <Text>{numberCommaFormat(item.people)} 세대</Text>
                                    </Paragraph>,
                                    <Paragraph key={index}>
                                        <Text>{numberCommaFormat(item.group)} 동</Text>
                                    </Paragraph>,
                                ]}>
                                <Meta description={item.address} />
                            </Card>


                        </Col>
                        <Col key={item.id} span={8}>
                            <div style={{ height: 300 }}>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <LineChart
                                        width={300}
                                        height={300}
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
                        <Col key={item.id} span={8}>
                            <div style={{ height: 300 }}>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <BarChart
                                        width={300}
                                        height={300}
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

                                    {/*<BarChart
                                        width={500}
                                        height={500}
                                        data={item.rentDeals}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 40,
                                            bottom: 20,
                                        }}
                                    >
                                        <XAxis dataKey='dealDate' />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar type='monotone' dataKey='money' stroke='#8884d8' />
                                    </BarChart>*/}
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