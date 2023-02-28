import useSWR from "swr";
import { Button, Select } from "antd";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function RegisterAdm(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [clienteId, setclienteId] = useState(null);
  const { data, error, mutate, isLoading } = useSWR(
    "/api/getClientes/" + props.id,
    fetcher,
    {
      refreshInterval: 1500,
    }
  );

  const handleRegisterAdm = async () => {
    const cancel = await axios.post("/api/register_adm", clienteId);
    if (cancel.status === 200) {
      enqueueSnackbar("Administrador cadastrado com sucesso!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Erro ao cadastrar Administrador!", { variant: "error" });
    }
  };

  let options = data?.map((cliente) => {
    return {
      value: cliente.id,
      label: cliente.nomeCliente,
    };
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className="flex justify-center items-center m-2 flex-col">
        <Select
          showSearch
          onChange={(value, label) => {
            setclienteId(value);
          }}
          style={{ width: "50%" }}
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
        <Button className="m-2"  disabled={!clienteId}>
          Salvar
        </Button>
      </div>
    </>
  );
}
