import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;


export interface IPropsDate {
    name: string;
    control?: Control;

    format?: any;
    picker?: string;
    onChange?: (data: any) => void;
}

const DateRangeField: FC<IPropsDate> = ({
                                            name,
                                            control,
                                            format,
                                            picker,
                                            onChange,
                                            ...props
                                        }) => {
    const components = (field: any = null) => (
        <RangePicker
            {...field}
            {...props}
            format={format}
            picker={picker}
            value={field.value}
            onChange={(e: any, dateString) => {
                if (onChange) {
                    onChange(dateString);
                }

                field.onChange(e);
            }}
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

export default DateRangeField;