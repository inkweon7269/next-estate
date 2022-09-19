import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

export interface IPropsSelect {
    name: string;
    control?: Control;

    options: { value: string | number | boolean; label: string; disabled?: boolean }[];
    onChange?: (data: any) => void;
    style?: any;
}

const SelectField: FC<IPropsSelect> = ({
                                           name,
                                           control,
                                           options,
                                           onChange,
                                           ...props
                                       }) => {
    const components = (field: any = null) => (
        <Select
            {...field}
            {...props}
            onChange={(e) => {
                if (onChange) {
                    onChange(e);
                }
                field.onChange(e);
            }}
        >
            {options.map((item, key) => (
                <Select.Option key={key} value={item.value} disabled={item.disabled}>
                    {item.label}
                </Select.Option>
            ))}
        </Select>
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

export default SelectField;