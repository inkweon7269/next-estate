import React, { FC } from 'react';
import { Input, InputProps } from 'antd';
import { Control, Controller } from 'react-hook-form';

export interface IPropsTextArea extends InputProps {
    name: string;
    control?: Control;
}

const TextAreaField: FC<IPropsTextArea> = ({
                                               name,
                                               control,
                                               required,
                                               ...props
                                           }) => {
    const components = (field: any = null) => (
        <Input.TextArea
            {...field}
            {...props}
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

export default TextAreaField;