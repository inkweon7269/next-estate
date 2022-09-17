import React, { FC } from 'react';
import { Switch, SwitchProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

export interface IPropsSwitch extends SwitchProps {
    name: string;
    control?: Control;
}

const SwitchField: FC<IPropsSwitch> = ({
                                           name,
                                           control,
                                           ...props
                                       }) => {
    const components = (field: any = null) => (
        <Switch
            {...field}
            {...props}
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

export default SwitchField;