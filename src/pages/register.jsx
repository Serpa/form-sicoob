import WebcamComp from "components/Camera";
import { useContext, useEffect } from "react";
import { ClienteContext } from "contexts/ClienteContext";
import Template from "@/components/Template";
import { Button, Checkbox, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Head from "next/head";
import dayjs from "dayjs";
import { MaskedInput } from "antd-mask-input";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Register() {
  const { data, error, mutate, isLoading } = useSWR(
    "/api/getReunion",
    fetcher,
    {
      refreshInterval: 1500,
    }
  );
  const [assembleia, setAssembleia] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("assembleia");
      const assembleiaStorage = JSON.parse(item);
      setAssembleia(assembleiaStorage);
    }
  }, []);

  let options = data?.map((assembleia) => {
    return {
      value: assembleia.id,
      label: assembleia.nome,
    };
  });
  const onFinish = (values) => {
    values.dataNascimento = dayjs(values.dataNascimento).format("YYYY/MM/DD");
    handleRegister(values, assembleia);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { handleAddCliente, img, handleRegister } = useContext(ClienteContext);
  const cellphoneMask = "(00)00000-0000";
  const phoneMask = "(00) 0000-0000";

  return (
    <>
      <Head>
        <title>Formulário Sicoob - Registro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template menu={"2"}>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 flex justify-center items-center flex-col">
          <h1 className="uppercase mb-5 font-bold">
            Assembleia: {assembleia?.label}
          </h1>
          <div className="mx-auto max-w-lg text-center flex justify-center items-center">
            <WebcamComp />
          </div>
          <div className="mx-auto max-w-lg text-center flex justify-center items-center">
            {" "}
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                minWidth: 500,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
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
                style={{
                  minWidth: 500,
                }}
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
              >
                {img ? (
                  <Button type="text" htmlType="submit" icon={<SaveOutlined />}>
                    Cadastrar
                  </Button>
                ) : null}
              </Form.Item>
            </Form>
          </div>

          <div className="grid justify-items-start"></div>
        </div>
      </Template>
    </>
  );
}
