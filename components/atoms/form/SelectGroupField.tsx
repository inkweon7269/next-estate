import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

type GroupOption = {
    group: string;
    optionLists: { value: string | number; label: string; disabled?: boolean; }[];
}

export interface IPropsSelectGroup {
    name: string;
    control?: Control;

    options: GroupOption[];
}

const SelectGroupField: FC<IPropsSelectGroup> = ({
                                           name,
                                           control,
                                           options,
                                           ...props
                                       }) => {
    const components = (field: any = null) => (
        <Select
            {...field}
            {...props}
        >
            {options.map((item) => (
                <Select.OptGroup key={item.group} label={item.group}>
                    {item.optionLists.map((list) => (
                        <Select.Option key={list.value} value={list.value}>
                            {list.label}
                        </Select.Option>
                    ))}
                </Select.OptGroup>
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

export default SelectGroupField;