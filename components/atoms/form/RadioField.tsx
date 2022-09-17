import React, { FC } from 'react';
import { Radio, RadioProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

export interface IPropsRadio extends RadioProps {
    name: string;
    control?: Control;

    options?: { value: string | number | boolean; label: string }[];
}

const RadioField: FC<IPropsRadio> = ({
                                         name,
                                         control,
                                         options,
                                         ...props
                                     }) => {
    const components = (field: any = null) => (
        <Radio.Group
            {...field}
            {...props}
            options={options}
        />
    )

    return control ? (
        <Controller
            control={control}
            name={name}
            render={({ field }) => components(field)}
        />
    ) : (
        components()
    );
};

export default RadioField;