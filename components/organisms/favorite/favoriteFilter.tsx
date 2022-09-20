import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFavoriteSimple } from './hooks/useFavorite';
import { useFormContext } from 'react-hook-form';
import SelectField from '../../atoms/form/SelectField';
import { Card, Col, Row, Typography } from 'antd';
import { numberCommaFormat } from '../../../utilies/format';
import { getCookie } from 'cookies-next';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const FavoriteFilter = ({ params }) => {

    const token = getCookie('aptToken');
    const { control } = useFormContext();

    const router = useRouter();
    const [options, setOptions] = useState([]);
    const [apts, setApts] = useState([]);

    const { data, isLoading } = useFavoriteSimple(token);

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
                })
            });

            setApts(arr.flatMap(item => item.apt));
        } else {
            setApts([]);
        }
    }, [params.ids, data]);

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

    return (
        <>
            <SelectField
                control={control}
                name='ids'
                mode='multiple'
                options={options}
                onChange={onChange}
                style={{ width: '100%', marginBottom: 16 }}
            />

            <Row gutter={16}>
                {apts?.map((item, index) => (
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
                ))}
            </Row>
        </>
    );
};

export default FavoriteFilter;