import styled from 'styled-components';
import React, { FC } from 'react';

export interface IPropsPan {
    children: React.ReactNode;
    style?: any,
}

const Pan: FC<IPropsPan> = ({ children, style }) => {

    return (
        <PanArea style={style}>
            {children}
        </PanArea>
    );
};

// ${props => props.small ? 'max-width: 1100px;' : ''}
const PanArea = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 2px;
  padding: 20px;
  margin-bottom: 26px;
`;

export default Pan;