import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "antd";
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
    handleSubmit(props.cliente, assembleia);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [assembleia, setAssembleia] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("assembleia");
      const assembleiaStorage = JSON.parse(item);
      setAssembleia(assembleiaStorage);
    }
  }, []);

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
        <div className="mx-auto max-w-lg text-center flex justify-center items-center">
          <WebcamComp />
        </div>
        {img ? (
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
