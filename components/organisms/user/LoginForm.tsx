import React from 'react';
import { Card, Form, Typography } from 'antd';
import LabelField from '../../atoms/form/LabelField';
import TextField from '../../atoms/form/TextField';
import { useForm } from 'react-hook-form';
import ButtonField from '../../atoms/form/ButtonField';
import ErrorField from '../../atoms/form/ErrorField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from './hooks/useAuth';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const { Title } = Typography;

const loginSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다.').required('필수 항목입니다.'),
    password: yup.string().required('필수 항목입니다.'),
});

const LoginForm = () => {
    const router = useRouter();

    const { mutate, isSuccess, isError } = useLogin();
    const form = useForm({
        resolver: yupResolver(loginSchema),
    });
    const { control, handleSubmit, formState: { errors } } = form;

    const onSubmit = (data: any) => {
        mutate(data);
    };

    if (isSuccess) {
        console.log('로그인 Mutate');
        router.push('/sample');
    }

    return (
        <Form
            layout='vertical'
            onFinish={handleSubmit(onSubmit)}
        >
            <CardWrap>
                <Card>
                    <Title level={5}>로그인</Title>

                    <LabelField label='이메일'>
                        <TextField
                            control={control}
                            type='email'
                            name='email'
                        />
                        <ErrorField message={errors?.email?.message} />
                    </LabelField>

                    <LabelField label='비밀번호'>
                        <TextField
                            control={control}
                            type='password'
                            name='password'
                        />
                        <ErrorField message={errors?.password?.message} />
                    </LabelField>

                    <ButtonField
                        text='로그인'
                        htmlType='submit'
                        block
                        type='primary'
                    />
                </Card>
            </CardWrap>
        </Form>
    );
};

export default LoginForm;

const CardWrap = styled.div`
  width: 400px;
  margin: 80px auto;
  text-align: center;
`;