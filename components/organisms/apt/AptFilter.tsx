import React, { useEffect, useState } from 'react';
import SelectField from '../../atoms/form/SelectField';
import ButtonField from '../../atoms/form/ButtonField';
import { useAptSimple } from './hooks/useApts';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAddFavorite } from '../favorite/hooks/useFavorite';
import { getCookie } from 'cookies-next';
import { aptToken } from '../../../axiosInstance';

const AptFilter = ({ params }) => {
    const router = useRouter();
    const [options, setOptions] = useState([]);
    const { data, isLoading, isError } = useAptSimple(aptToken);
    const { mutate, isSuccess: favoriteSuccess, isError: favoriteError } = useAddFavorite();

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
                apt
            },
        });
    };

    const onSubmitFavorite = () => {
        const data = {
            id: params.apt,
        };

        mutate(data);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
        <SelectField
                control={control}
                name='apt'
                options={options}
                onChange={onChange}
                style={{ width: 250 }}
        />
            <ButtonField type='primary' text='즐겨찾기 추가' disabled={!params.apt} onClick={onSubmitFavorite} />
        </div>
    );
};

export default AptFilter;