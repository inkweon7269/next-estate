import LoginForm from '../components/organisms/user/LoginForm';
import { Layout } from 'antd';
import SiteHeader from '../components/atoms/SiteHeader';

const Index = () => {
    const pageInfo = {
        title: '로그인',
        subTitle: '상품조회',
        routes: [{
            path: '/product/list',
        }],
        // extra: [
        //     <ButtonField
        //         key='btn1'
        //         text='신규 등록'
        //         type='primary'
        //         htmlType='button'
        //         size='middle'
        //         onClick={() => router.push('/product/add/')}
        //     />,
        // ],
    };

    return (
        <LoginForm />
    )
};

export default Index;