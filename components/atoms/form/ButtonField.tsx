import React, { FC } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd';

export interface IPropsButton extends ButtonProps {
    text: string;
}

const ButtonField: FC<IPropsButton> = ({ text, ...props }) => {
    return (
        <Button
            {...props}
        >
            {text}
        </Button>
    );
};

export default ButtonField;