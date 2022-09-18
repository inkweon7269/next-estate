import React from 'react';
import { Form } from 'antd';
import LabelField from '../../atoms/form/LabelField';
import TextField from '../../atoms/form/TextField';
import { useForm } from 'react-hook-form';
import ButtonField from '../../atoms/form/ButtonField';
import ErrorField from '../../atoms/form/ErrorField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from './hooks/useAuth';

const loginSchema = yup.object().shape({
    email: yup.string().email('이메일 양식이 아닙니다.').required('필수 항목입니다.'),
    password: yup.string().required('필수 항목입니다.')
});

const LoginForm = () => {
    const { mutate, isSuccess, isError } = useLogin();
    const form = useForm({
        resolver: yupResolver(loginSchema),
    });
    const { control, handleSubmit, formState: { errors } } = form;

    const onSubmit = (data: any) => {
        mutate(data);
    };

    console.log(isSuccess);

    return (
        <Form
            layout='vertical'
            onFinish={handleSubmit(onSubmit)}
        >
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

            <ButtonField text='로그인' htmlType='submit' />
        </Form>
    );
};

export default LoginForm;