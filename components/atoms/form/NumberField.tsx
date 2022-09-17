import React, { FC } from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

export interface IPropsNumber extends InputNumberProps {
    name: string;
    control?: Control;
}

const NumberField: FC<IPropsNumber> = ({
                                           name,
                                           control,
                                           required,
                                           ...props
                                       }) => {

    const components = (field: any = null) => (
        <InputNumber
            {...field}
            {...props}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
        />
    );

    return control ? (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({ field }) => components(field)}
        />
    ) : (
        components()
    );
};

export default NumberField;