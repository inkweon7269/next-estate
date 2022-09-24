import React, { useEffect, useState } from 'react';
import SelectField from '../../atoms/form/SelectField';
import ButtonField from '../../atoms/form/ButtonField';
import { useAptSimple, useCrawling } from './hooks/useApts';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAddFavorite } from '../favorite/hooks/useFavorite';
import { getCookie } from 'cookies-next';

const AptFilter = ({ params }) => {

    const token = getCookie('aptToken');

    const router = useRouter();
    const [options, setOptions] = useState([]);
    const { data, isLoading, isError } = useAptSimple(token);

    const { mutate: favoriteMutate } = useAddFavorite();
    const { mutate: crawlingMutate } = useCrawling();

    const { control } = useFormContext();

    useEffect(() => {
        if (data?.data) {
            const arr = data?.data?.map((item: any) => ({
                label: item.name,
                value: item.id,
            }));

            setOptions([{ value: '', label: '전체' }, ...arr]);
        }
    }, [isLoading]);

    const onChange = (apt: any) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...params,
                page: 1,
                apt,
            },
        });
    };

    const onCrawling = () => {
        crawlingMutate();
    };

    const onSubmitFavorite = () => {
        const data = {
            id: params.apt,
        }

        favoriteMutate({ token, data });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ButtonField text='정보 업데이트' onClick={onCrawling} />

            <div>
                <SelectField
                    control={control}
                    name='apt'
                    options={options}
                    onChange={onChange}
                    style={{ width: 250 }}
                />
                <ButtonField type='primary' text='즐겨찾기 추가' disabled={!params.apt} onClick={onSubmitFavorite} />
            </div>
        </div>
    );
};

export default AptFilter;