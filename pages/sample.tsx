import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { BackTop, Form, Layout, Menu, Tooltip } from 'antd';
import LabelField from '../components/atoms/form/LabelField';
import TextField from '../components/atoms/form/TextField';
import NumberField from '../components/atoms/form/NumberField';
import CheckboxField from '../components/atoms/form/CheckboxField';
import RadioField from '../components/atoms/form/RadioField';
import SelectField from '../components/atoms/form/SelectField';
import SelectGroupField from '../components/atoms/form/SelectGroupField';
import TextAreaField from '../components/atoms/form/TextAreaField';
import SwitchField from '../components/atoms/form/SwitchField';
import ButtonField from '../components/atoms/form/ButtonField';
import axios from 'axios';
import SiteHeader from '../components/atoms/SiteHeader';
import { useRouter } from 'next/router';
import SiteWrap from '../components/atoms/SiteWrap';
import { Bar, CartesianGrid, Legend, Line, ResponsiveContainer, XAxis, YAxis, ComposedChart } from 'recharts';

const { Content, Sider } = Layout;

const getPeople = async () => {
    const res = await axios.get('https://swapi.dev/api/people/1');
    return res.data;
};

const Sample = () => {
    const form = useForm();
    const { control } = form;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const data = [
        {
            dateBuy: '2022-01-01',
            buy: 10,
            dateRent: '2022-01-01',
            rent: 10,
        },
        {
            dateRent: '2022-01-01',
            rent: 20,
        },
        {
            dateBuy: '2022-01-01',
            buy: 20,
        },
        {
            dateBuy: '2022-01-01',
            buy: 30,
            dateRent: '2022-01-01',
            rent: 30,
        },
    ];

    return (
        <div>
            <SiteHeader
                title='Sample'
            />

            <Content style={{ padding: 20 }}>
                <div style={{ width: 'calc(100vw - 16px)', height: 'calc(100vh - 16px)' }}>
                    <ResponsiveContainer>
                        <ComposedChart
                            width={600}
                            height={400}
                            data={data}
                            margin={{ top: 40, right: 40, bottom: 30, left: 40 }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="dateBuy" />
                            <XAxis dataKey="dateRent" />


                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />

                            <Tooltip />
                            <Legend />

                            <Bar yAxisId="left" dataKey="rent" barSize={30} fill="#7ac4c0" />
                            <Line yAxisId="right" type="monotone" dataKey="buy" stroke="#ff7300" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/*
                <TextField
                    control={control}
                    type='search'
                    name='search'
                    onSearch={onSubmit}
                />

                <Form
                    layout='vertical'
                    onFinish={form.handleSubmit(onSubmit)}
                >
                    <LabelField label='이메일'>
                        <TextField
                            control={control}
                            type='text'
                            name='email'
                        />
                    </LabelField>

                    <TextField
                        control={control}
                        type='password'
                        name='pw'
                    />

                    <NumberField
                        control={control}
                        name='point'
                    />

                    <CheckboxField
                        control={control}
                        name='country'
                        options={[
                            { label: '한국', value: 'Korea' },
                            { label: '영국', value: 'England' },
                        ]}
                    />

                    <RadioField
                        control={control}
                        name='fruit'
                        options={[
                            { label: '사과', value: 'Apple' },
                            { label: '바나나', value: 'Banana' },
                        ]}
                    />

                    <SelectField
                        control={control}
                        name='gender'
                        options={[
                            { label: '남자', value: 'Male' },
                            { label: '여자', value: 'Female' },
                        ]}
                    />

                    <SelectGroupField
                        control={control}
                        name='delivery'
                        options={[
                            {
                                group: '국내',
                                optionLists: [
                                    { label: '경상도', value: '경상도' },
                                ],
                            },
                            {
                                group: '해외',
                                optionLists: [
                                    { label: '아마존', value: '아마존' },
                                ],
                            },
                        ]}
                    />

                    <TextAreaField
                        control={control}
                        name='intro'
                    />

                    <SwitchField
                        control={control}
                        name='bool'
                    />

                    <ButtonField type='primary' htmlType='submit' text='클릭' />
                </Form>
                */}
            </Content>
        </div>
    );
};

export default Sample;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['posts'], () => getPeople());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};