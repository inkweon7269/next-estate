import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LabelField from '../../atoms/form/LabelField';
import TextField from '../../atoms/form/TextField';
import ErrorField from '../../atoms/form/ErrorField';
import ButtonField from '../../atoms/form/ButtonField';
import { Card, Form, Typography } from 'antd';
import { useJoin } from './hooks/useAuth';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const { Title } = Typography;

const joinSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다.').required('필수 항목입니다.'),
    password: yup.string().required('필수 항목입니다.'),
    checkPw: yup
        .string()
        .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('필수 항목입니다.'),
});

const JoinForm = () => {

    const { mutate, isSuccess, isError } = useJoin();
    const router = useRouter();

    const form = useForm({
        resolver: yupResolver(joinSchema),
    });
    const { control, handleSubmit, formState: { errors } } = form;

    const onSubmit = (data: any) => {
        const { email, password } = data;
        const result = { email, password };
        mutate(result);
    };

    if (isSuccess) {
        console.log('로그인 Mutate');
        router.push('/');
    }

    return (
        <Form
            layout='vertical'
            onFinish={handleSubmit(onSubmit)}
        >
            <CardWrap>
                <Card>
                    <Title level={5}>회원가입</Title>

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

                    <LabelField label='비밀번호 확인'>
                        <TextField
                            control={control}
                            type='password'
                            name='checkPw'
                        />
                        <ErrorField message={errors?.checkPw?.message} />
                    </LabelField>

                    <ButtonField
                        text='회원가입'
                        htmlType='submit'
                        block
                        type='primary'
                    />
                </Card>
            </CardWrap>
        </Form>
    );
};

export default JoinForm;

const CardWrap = styled.div`
  width: 400px;
  margin: 80px auto;
  text-align: center;
`;