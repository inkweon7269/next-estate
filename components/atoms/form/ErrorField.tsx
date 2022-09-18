import React, { FC } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typography;

export interface IPropsError {
    message?: any;
}

const ErrorField: FC<IPropsError> = ({
                                         message,
                                     }) => {
    return (
        <_StyledError>{message}</_StyledError>
    );
};

export default ErrorField;

const _StyledError = styled(Paragraph)`
  color: #c02428;
  margin-bottom: 0 !important;
`;