import React, { useState } from 'react';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [errorLogin, setErrorLogin] = useState('')
    const router = useRouter()
    const onFinish = async (values) => {
        setLoading(true);
        setErrorLogin('')
        const { email, password } = values;
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
                callbackUrl: '/',
            });
            if (result.status === 401) {
                setLoading(false);
                setErrorLogin('E-mail e/ou senha incorretos.')
            }
            if (result.ok) {
                router.push(result.url);
            }
        } catch (error) {
            setLoading(false);
            setErrorLogin('Erro ao entrar')
            console.log('Sign in error:', error);
        }
    };

    const onFinishFailed = (errorInfo) => {
    };


    return (
        <Card
            title='Login'
        >

            <Form
                name="basic"
                style={{
                    maxWidth: 600,
                    minWidth: 400
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item
                    label='E-mail'
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira um e-mail válido!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira sua senha!',
                        },
                    ]}
                >
                    <Input type='password' autoComplete='current-password' />
                </Form.Item>

                <p className='text-red-500 font-bold text-center'>{errorLogin}</p>
                <Form.Item
                    className='flex justify-center items-center'
                >
                    <Button htmlType="submit">
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}