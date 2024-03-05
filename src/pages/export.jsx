import GetData from "components/GetData";
import Template from "../../components/Template";
import * as XLSX from "xlsx";
import axios from "axios";
import { Button } from "antd";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Select } from "antd";
import Head from "next/head";

const fetcher = (url) => axios.get(url).then((res) => res.data);
export default function Doc() {
  const handleXls = async () => {
    const clientes = await axios.get("/api/getClientes/" + idAssembleia);
    let dataUpdate = clientes.data;
    dataUpdate = dataUpdate.map(({ foto, ...rest }) => rest);
    dataUpdate = dataUpdate.map(({ id, ...rest }) => rest);
    dataUpdate = dataUpdate.map(({ assembleiaId, ...rest }) => rest);
    dataUpdate = dataUpdate.map(({ Administradores, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataUpdate);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, "Output.xlsx", { compression: true });
  };
  const {
    data: assembleias,
    error,
    mutate,
    isLoading,
  } = useSWR("/api/getReunion", fetcher, {
    refreshInterval: 1500,
  });
  const [idAssembleia, setIdAssembleia] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("assembleia");
      const assembleia = JSON.parse(item);
      setIdAssembleia(assembleia?.value);
    }
  }, []);

  let options = assembleias?.map((assembleia) => {
    return {
      value: assembleia.id,
      label: assembleia.nome,
    };
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Formulário Sicoob - Exportar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template menu={"3"}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fffff",
          }}
          className="flex justify-center items-center flex-col"
        >
          <Select
            showSearch
            onChange={(value, label) => {
              if (typeof window !== "undefined") {
                localStorage.setItem("assembleia", JSON.stringify(label));
              }
              setIdAssembleia(value);
            }}
            defaultValue={() => {
              if (typeof window !== "undefined") {
                // Perform localStorage action
                const item = localStorage.getItem("assembleia");
                return JSON.parse(item);
              }
            }}
            style={{ width: 200 }}
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
          <Button className="my-5" onClick={handleXls}>
            Exportar
          </Button>
        </div>
      </Template>
    </>
  );
}
