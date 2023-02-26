import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Select } from "antd";
import WebcamComp from "./Camera";
import { ClienteContext } from "contexts/ClienteContext";
import { SaveOutlined } from "@ant-design/icons";

export default function RegisterModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleAddCliente, handleCliente, handleSubmit, img } =
    useContext(ClienteContext);

  const showModal = () => {
    handleCliente(props.cliente.id);
    handleAddCliente(props.cliente);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleSubmit(props.cliente, assembleia, adm);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [assembleia, setAssembleia] = useState(null);
  const [adm, setAdm] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("assembleia");
      const assembleiaStorage = JSON.parse(item);
      setAssembleia(assembleiaStorage);
    }
  }, []);

  let options = props.cliente?.Administradores?.map((adm) => {
    return {
      value: adm.id,
      label: adm.nomeAdm,
    };
  });

  return (
    <>
      <Button type="default" onClick={showModal}>
        Cadastrar
      </Button>
      <Modal
        title={props.cliente.nomeCliente}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        {props.cliente?.Administradores.length > 0 ? (
          <div className="flex justify-center items-center m-2">
            <Select
              showSearch
              onChange={(value, label) => {
                setAdm(label.label);
              }}
              style={{ width: "100%" }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={options}
            />
          </div>
        ) : null}
        <div className="mx-auto max-w-lg text-center flex justify-center items-center">
          <WebcamComp />
        </div>
        {img && adm ? (
          <div className="mx-auto max-w-lg text-center flex justify-center items-center pt-2">
            <Button
              key="submit"
              type="default"
              icon={<SaveOutlined />}
              onClick={handleOk}
            >
              Salvar
            </Button>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
