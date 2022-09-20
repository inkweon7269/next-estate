import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

const { Header } = Layout;
const { Title } = Typography;

interface IPropsTitle {
    title?: string;
    items?: { label: string, key: string }[];
}

const SiteHeader: FC<IPropsTitle> = ({ title, items }) => {
    const router = useRouter();
    const onMenuSelect = ({ key }: { key: string }) => router.push(key).then(() => window.scrollTo(0, 0));
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const token = getCookie('aptToken');
        if (token) {
            setMenu([
                { label: '로그아웃', key: '/logout' },
            ]);
        } else {
            setMenu([
                { label: '로그인', key: '/' },
                { label: '회원가입', key: '/join' },
            ]);
        }
    }, []);

    return (
        <_StyledHeader>
            <_StyledTitle level={4}>{title}</_StyledTitle>
            <_StyledMenu
                mode='horizontal'
                items={menu}
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
