import React, { FC } from 'react';
import { Form } from 'antd';

export interface IPropsLabel {
    label?: string;
    children: React.ReactNode;
}

const LabelField: FC<IPropsLabel> = (
    {
        label,
        children,
    },
) => {
    return (
        <Form.Item label={label}>
            {children}
        </Form.Item>
    );
};

export default LabelField;