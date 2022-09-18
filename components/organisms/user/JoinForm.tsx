import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LabelField from '../../atoms/form/LabelField';
import TextField from '../../atoms/form/TextField';
import ErrorField from '../../atoms/form/ErrorField';
import ButtonField from '../../atoms/form/ButtonField';
import { Form } from 'antd';
import { useJoin } from './hooks/useAuth';
import { useRouter } from 'next/router';

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
        router.push('/');
    }

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

            <LabelField label='비밀번호 확인'>
                <TextField
                    control={control}
                    type='password'
                    name='checkPw'
                />
                <ErrorField message={errors?.checkPw?.message} />
            </LabelField>

            <ButtonField text='회원가입' htmlType='submit' />
        </Form>
    );
};

export default JoinForm;