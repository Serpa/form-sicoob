import axios from "axios";
import { createContext, useState } from "react";
import { useSnackbar } from "notistack";

export const ClienteContext = createContext({});

export const ClienteProvider = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [img, setImg] = useState(null);
    const [cliente, setCliente] = useState(null);

    const handleAddCliente = (cliente) => {
        setCliente(cliente)
    }
    const handleImagem = (img) => {
        setImg(img)
    }

    const [clienteId, setClientId] = useState(null)

    const handleCliente = (clienteId) => {
        setClientId(clienteId)
    }

    const handleSubmit = async (cliente, assembleia) => {
        const fileData = { base64: img, fileName: cliente.numeroCPF_CNPJ, assembleia: assembleia.label };
        try {
            const result = await axios.post("api/upload", fileData);
            const res = await axios.post(`/api/presence`, { id: clienteId, foto: result.data.fileName });
            enqueueSnackbar('Imagem salva com sucesso!', { variant: 'success' })
        } catch (error) {
            enqueueSnackbar('Erro ao salvar a imagem!' + error, { variant: 'error' })
        }
        handleImagem(null)
    }


    const handleRegister = async (cliente, assembleia) => {
        try {
            const fileData = { base64: img, fileName: cliente.numeroCPF_CNPJ, assembleia: assembleia.label };
            const result = await axios.post("api/upload", fileData);
            const res = await axios.post(`/api/register`, {
                ...cliente, foto: result.data.fileName, presente: true, assembleiaId: assembleia.value,
                hora: new Date()
            });
            enqueueSnackbar('Imagem salva com sucesso!', { variant: 'success' })
            console.log(res);
        } catch (error) {
            enqueueSnackbar('Erro ao salvar a imagem!', { variant: 'error' })
        }
        handleImagem(null)
    }

    return <ClienteContext.Provider value={{ img, handleImagem, clienteId, handleCliente, handleSubmit, handleRegister, cliente, handleAddCliente }}>{children}</ClienteContext.Provider>
}