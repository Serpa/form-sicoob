import React, { useState, useContext, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { ClienteContext } from "../contexts/ClienteContext";
import { SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { MaskedInput } from "antd-mask-input";
import WebcamCompChoise from './CameraChoice';
const { Option } = Select;

export default function MobileRegister({ assembleia }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };
    const onFinish = (values) => {
        try {
            values.dataNascimento = dayjs(values.dataNascimento).format("YYYY/MM/DD");
            handleRegister(values, assembleia);
            form.resetFields();
        } catch (error) {

        }

    };
    const onFinishFailed = (errorInfo) => {
    };
    const { handleAddCliente, img, handleRegister } = useContext(ClienteContext);
    const cellphoneMask = "(00)00000-0000";
    const phoneMask = "(00) 0000-0000";
    return (
        <>
            <Button onClick={showDrawer} icon={<PlusOutlined />}>
                Cadastrar novo usuário
            </Button>
            <Drawer
                title="Cadastrar novo usuário"
                onClose={onClose}
                open={open}
                width={'100%'}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                    </Space>
                }
            >
                <div className='flex flex-col justify-center items-center'>
                    <WebcamCompChoise />
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='max-w-full'
                >

                    <Form.Item
                        label="Status"
                        name="associado"
                        valuePropName="checked"

                    >
                        <Checkbox className="flex">Associado</Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Número PA"
                        name="numeroPA"
                        rules={[
                            {
                                required: false,
                                message: "Preencha o Número PA",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nome Cliente"
                        name="nomeCliente"
                        rules={[
                            {
                                required: true,
                                message: "Preencha o nome do cliente",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="CPF/CNPJ"
                        name="numeroCPF_CNPJ"
                        rules={[
                            {
                                required: true,
                                message: "Preencha o CPF/CNPJ do cliente",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contato"
                        name="contato"
                        rules={[
                            {
                                required: false,
                                message: "Preencha o contato do cliente",
                            },
                        ]}
                    >
                        <MaskedInput mask={cellphoneMask} />
                    </Form.Item>

                    <Form.Item
                        label="Data de Nascimento"
                        name="dataNascimento"
                        rules={[
                            {
                                required: false,
                                message: "Preencha a data de Nascimento",
                            },
                        ]}
                    >
                        <Input type="date" onChange={(e) => { }} />
                    </Form.Item>

                    <Form.Item
                        label="Nome Gerente"
                        name="nomeGerente"
                        rules={[
                            {
                                required: false,
                                message: "Preencha o nome do Gerente",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nome Administrador"
                        name="nomeAdm"
                        rules={[
                            {
                                message: "Preencha o nome do Administrador",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descrição Administrador"
                        name="descricao"
                        rules={[
                            {
                                message: "Preencha a descrição do Administrador",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className='flex justify-center'
                    >
                        {img && (
                            <Button htmlType="submit" icon={<SaveOutlined />}>
                                Cadastrar
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};