import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import WebcamComp from "./Camera";
import { ClienteContext } from "contexts/ClienteContext";
import { SaveOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function ImagemModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>
        <Image
          width={50}
          height={50}
          alt={props.nomeCliente}
          src={props.foto}
        ></Image>
      </div>

      <Modal
        title={props.cliente?.nomeCliente}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Voltar
          </Button>,
          <Button
            key="submit"
            type="default"
            icon={<SaveOutlined />}
            onClick={handleOk}
          >
            Salvar
          </Button>,
        ]}
      >
        <div className="mx-auto max-w-lg text-center flex justify-center items-center">
          <Image
            width={400}
            height={400}
            alt={props.nomeCliente}
            src={props.foto?.replace("./public", "")}
          ></Image>
        </div>
      </Modal>
    </>
  );
}
