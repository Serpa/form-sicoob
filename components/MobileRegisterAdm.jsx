import React, { useState, useContext, useEffect } from 'react';
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { Button, Drawer, Form, Input, Select, Space } from 'antd';
import { useSnackbar } from 'notistack';
import axios from 'axios';
const { Option } = Select;

export default function MobileRegisterAdm({ assembleia, clientes }) {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };
    const onFinish = async (values) => {
        setLoading(true)
        const cancel = await axios.post("/api/register_adm", values);
        if (cancel.status === 200) {
            form.resetFields();
            enqueueSnackbar("Administrador cadastrado com sucesso!", {
                variant: "success",
            });
            setLoading(false)
        } else {
            enqueueSnackbar("Erro ao cadastrar Administrador!", { variant: "error" });
            setLoading(false)
        }
    };
    const onFinishFailed = (errorInfo) => {
        setLoading(false)
    };
    let options = clientes.map((cliente) => {
        return {
            value: cliente.id,
            label: cliente.nomeCliente,
        };
    });

    return (
        <>
            <Button onClick={showDrawer} icon={<PlusOutlined />}>
                Cadastrar novo Administrador
            </Button>
            <Drawer
                title="Cadastrar novo Administrador"
                onClose={onClose}
                open={open}
                width={'100%'}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                    </Space>
                }
            >
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
                        label="Usuário"
                        name="clienteId"
                        rules={[
                            {
                                required: true,
                                message: "Selecione um usuário",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Selecione o usuário"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? "").toLowerCase())
                            }
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Nome do Administrador"
                        name="nomeAdm"
                        rules={[
                            {
                                required: true,
                                message: "Preencha o Nome do Administrador",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descrição do Administrador"
                        name="desc"
                        rules={[
                            {
                                required: true,
                                message: "Preencha a descrição do Administrador",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Button
                        className="m-2"
                        htmlType='submit'
                        disabled={loading}
                    >
                        {loading && <LoadingOutlined />}
                        Salvar
                    </Button>
                </Form>
            </Drawer>
        </>
    );
};