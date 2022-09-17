import React, { FC } from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

export interface IPropsCheckbox extends CheckboxProps {
    name: string;
    control?: Control;

    options?: { value: string | number | boolean; label: string }[];
}

const CheckboxField: FC<IPropsCheckbox> = ({
                                               name,
                                               control,
                                               options,
                                               ...props
                                           }) => {
    const components = (field: any = null) => (
        <Checkbox.Group
            {...field}
            {...props}
            options={options}
        />
    );

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

export default CheckboxField;