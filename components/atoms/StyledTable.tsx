import React, { FC } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import { SizeType } from 'antd/es/config-provider/SizeContext';

export interface IPropsTable {
    className?: string;
    rowSelection?: any;
    columns: any[];
    dataSource: any[];
    scroll?: {};
    rowKey?: string;
    pagination?: any;
    onChange?: (pagination, filters, sorter) => void;
    expandable?: any;
    size?: SizeType;
    bordered?: boolean;
    childrenColumnName?: string;
    style?: any;
    loading?: boolean;
}

const StyledTable: FC<IPropsTable> = ({
                                          className,
                                          rowSelection,
                                          columns,
                                          dataSource,
                                          scroll,
                                          rowKey,
                                          pagination,
                                          onChange,
                                          expandable,
                                          size = 'middle',
                                          bordered = true,
                                          childrenColumnName = 'children',
                                          style,
                                          loading,
                                      }) => {
    return (
        <_StyledTable
            loading={loading}
            childrenColumnName={childrenColumnName}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            expandable={expandable}
            defaultExpandAllRows={true}
            scroll={scroll}
            className={className ? className : 'table-striped-rows'}
            bordered={bordered}
            size={size}
            rowKey={rowKey}
            pagination={pagination}
            onChange={onChange}
            style={style}
        />
    );
};

export default StyledTable;

const _StyledTable = styled(Table)`
  //.ant-table.ant-table-middle .ant-table-tbody .ant-table-wrapper:only-child .ant-table
  &.outer-table {
    .ant-table-row {
      background-color: #fbfbfb;
    }

    .ant-table-expanded-row {
      .ant-table-row,
      .ant-table-cell {
        background-color: #ffffff !important;
      }
    }
  }

  .inner-table .ant-table-bordered {
    margin-left: 459px !important;
    //border-left: 1px solid #f0f0f0;
  }
`;