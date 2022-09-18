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
        <Layout>
            <SiteHeader
                title='로그인'
                items={[
                    { label: '로그인', key: '/' },
                    { label: '회원가입', key: '/join' },
                ]}
            />
            <LoginForm />
        </Layout>
    )
};

export default Index;