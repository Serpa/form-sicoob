import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useSWR from "swr";
import MobilePresence from '../../../components/MobilePresence';
import { LoadingOutlined } from '@ant-design/icons'
import MobileRegister from '../../../components/MobileRegister';
import MobileRegisterAdm from '../../../components/MobileRegisterAdm';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function MobileIndex() {
    const { data, error, mutate, isLoading } = useSWR(
        "/api/getReunion",
        fetcher,
        {
            refreshInterval: 1500,
        }
    );
    const [assembleia, setAssembleia] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("assembleia") === 'undefined') localStorage.setItem("assembleia", null);
            const item = localStorage.getItem("assembleia");
            try {
                if (item !== 'undefined') {
                    handleSetAssembleia(JSON.parse(item))
                    setAssembleia(JSON.parse(item));
                }
            } catch (error) {
                console.log('Error userEffect')
            }
        }
    }, []);

    let options = data?.map((assembleia) => {
        return {
            value: assembleia.id,
            label: assembleia.nome,
        };
    });
    const handleSetAssembleia = async (label) => {
        try {
            setClientes([])
            if (typeof window !== "undefined") {
                localStorage.setItem("assembleia", JSON.stringify(label));
            }
            setAssembleia(label);
            setLoading(true)
            const { data: ResClientes } = await axios.get(`/api/getClientes/${label.value}`)
            setClientes(ResClientes.map(cliente => ({ value: JSON.stringify(cliente), label: cliente.nomeCliente, cpf_cnpj: cliente.numeroCPF_CNPJ })))
            setLoading(false)
        } catch (error) {
            console.log('HanddleAssembleiaError')
            setLoading(false)
        }
    }
    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;
    return (
        <div className='flex flex-col justify-center items-center p-5 space-y-5'>
            <p className='text-xl'>Registro de Presença</p>
            <Select
                showSearch
                onChange={(value, label) => handleSetAssembleia(label)}
                defaultValue={() => {
                    if (typeof window !== "undefined") {
                        const item = localStorage.getItem("assembleia");
                        return JSON.parse(item);
                    }
                }}
                style={{ width: "100%" }}
                placeholder="Selecione uma Assembleia"
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
            {loading && <LoadingOutlined />}
            {clientes.length > 0 && <Select
                showSearch
                onChange={(value, label) => {
                    setSelectedCliente(value)
                }}
                // defaultValue={() => {
                //     if (typeof window !== "undefined") {
                //         const item = localStorage.getItem("assembleia");
                //         return JSON.parse(item);
                //     }
                // }}
                value={selectedCliente}
                style={{ width: "100%" }
                }
                placeholder="Selecione um usuário"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    (option?.label + option?.cpf_cnpj ?? "").toLowerCase().includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={clientes}
            />}
            {selectedCliente && (
                <>
                    <p className='text-xl font-bold'>Nome: {JSON.parse(selectedCliente).nomeCliente}</p>
                    <p className='text-xl font-bold'>CPF/CNPJ: {JSON.parse(selectedCliente).numeroCPF_CNPJ}</p>
                    <p className='text-xl font-bold'>Data de Nascimento: {JSON.parse(selectedCliente).dataNascimento}</p>
                </>
            )}
            {selectedCliente && <MobilePresence cliente={JSON.parse(selectedCliente)} />}
            {assembleia && <MobileRegister assembleia={assembleia} />}
            {assembleia && clientes.length > 0 && <MobileRegisterAdm assembleia={assembleia} clientes={clientes.map(cli => (JSON.parse(cli.value)))} />}
        </div>
    )
}
