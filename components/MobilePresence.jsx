import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal, Select } from "antd";
import { ClienteContext } from "../contexts/ClienteContext";
import WebcamCompChoise from './CameraChoice';
import { SaveOutlined } from "@ant-design/icons";

export default function MobilePresence({ cliente }) {
    const { handleAddCliente, handleCliente, handleSubmit, img } = useContext(ClienteContext);

    let options = cliente.Administradores?.map((adm) => {
        return {
            value: adm.id,
            label: adm.nomeAdm,
        };
    });

    const [assembleia, setAssembleia] = useState();
    const [adm, setAdm] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem("assembleia");
            const assembleiaStorage = JSON.parse(item);
            setAssembleia(assembleiaStorage);
        }
    }, []);

    useEffect(() => {
        setAdm('')
    }, [options]);

    const handleOk = () => {
        handleCliente(cliente.id);
        handleAddCliente(cliente);
        handleSubmit(cliente, assembleia, adm);
    };

    return (
        <div>
            {cliente.Administradores.length > 0 ? (
                <div className="flex justify-center items-center m-2">
                    <Select
                        showSearch
                        onChange={(value, label) => {
                            setAdm(label.label);
                        }}
                        style={{ width: "100%" }}
                        placeholder="Selecione um Administrador
                        "
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
                <WebcamCompChoise />
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
        </div>
    )
}
