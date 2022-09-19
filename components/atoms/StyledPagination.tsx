import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';

const StyledPagination = ({
                              page,
                              limit,
                              total,
                              onChange,
                          }) => {

    return (
        <PaginationArea>
            <Pagination
                showSizeChanger={true}
                defaultCurrent={parseInt(page)}
                defaultPageSize={parseInt(limit)}
                current={parseInt(page)}
                total={parseInt(total)}
                onChange={onChange} />
        </PaginationArea>
    );
};

export default StyledPagination;

const PaginationArea = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;