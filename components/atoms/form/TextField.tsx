import React, { FC } from 'react';
import { Input, InputProps } from 'antd';
import { Control, Controller } from 'react-hook-form';


export interface IPropsInput extends InputProps {
    type?: string;
    name: string;
    control?: Control;

    value?: string;
    defaultValue?: string;
    onChange?: (e: any) => void;
    onSearch?: (e: any) => void;
}

const TextField: FC<IPropsInput> = ({
                                        type,
                                        name,
                                        control,
                                        required,
                                        value,
                                        defaultValue,
                                        onChange,
                                        onSearch,
                                        ...props
                                    }) => {
    const components = (field: any = null) => {
        if (type === 'search') {
            return (
                <Input.Search
                    {...(!field
                        ? {
                            ...(!value ? {} : { value }),
                            ...(!defaultValue ? {} : { defaultValue }),
                            onChange,
                        }
                        : field)}
                    {...props}
                    allowClear
                    onSearch={onSearch}
                />
            );
        }

        if (type === 'password') {
            return (
                <Input.Password
                    {...(!field
                        ? {
                            ...(!value ? {} : { value }),
                            ...(!defaultValue ? {} : { defaultValue }),
                            onChange,
                        }
                        : field)}
                    {...props}
                    onSearch={onSearch}
                />
            );
        }

        return (
            <Input
                {...(!field
                    ? {
                        ...(!value ? {} : { value }),
                        ...(!defaultValue ? {} : { defaultValue }),
                        onChange,
                    }
                    : field)}
                {...props}
            />
        );
    };

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

export default TextField;