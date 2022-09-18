import React, { FC } from 'react';
import { Layout, Menu, Typography } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const { Header } = Layout;
const { Title } = Typography;

interface IPropsTitle {
    title: string;
    items: { label: string, key: string }[];
}

const SiteHeader: FC<IPropsTitle> = ({ title, items }) => {
    const router = useRouter();
    const onMenuSelect = ({ key }: { key: string }) =>
        router.push(key).then(() => window.scrollTo(0, 0));

    return (
        <_StyledHeader>
            <_StyledTitle level={3}>{title}</_StyledTitle>
            <_StyledMenu
                mode='horizontal'
                items={items}
                triggerSubMenuAction={'click'}
                onSelect={onMenuSelect}
            />
        </_StyledHeader>
    );
};

export default SiteHeader;

const _StyledHeader = styled(Header)`
  background-color: #1890ff;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const _StyledTitle = styled(Title)`
  &.ant-typography {
    color: #ffffff;
  }
`;

const _StyledMenu = styled(Menu)`
  min-width: 540px;
  background-color: #1890ff;
  border-color: #1890ff;
  justify-content: end;

  .ant-menu-title-content {
    color: white;
  }

  .ant-menu-submenu-title {
    svg {
      color: white;
    }
  }

  .ant-menu-item a,
  .ant-menu-item a:hover {
    color: white;
  }
`;
