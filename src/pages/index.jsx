import Head from "next/head";
import { Inter } from "@next/font/google";
import axios from "axios";
import useSWR from "swr";
import Template from "@/components/Template";
import ClienteTable from "@/components/Table";
import { Select } from "antd";
import { useEffect, useState } from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      if (!data) localStorage.setItem("assembleia", null);
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
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <Head>
        <title>Formulário Sicoob - Clientes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template menu={"1"}>
        <div className="flex justify-center items-center">
          <Select
            showSearch
            onChange={(value, label) => {
              if (typeof window !== "undefined") {
                localStorage.setItem("assembleia", JSON.stringify(label));
              }
              setAssembleia(label);
            }}
            defaultValue={() => {
              if (typeof window !== "undefined") {
                // Perform localStorage action
                const item = localStorage.getItem("assembleia");
                return JSON.parse(item);
              }
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
        </div>
        {data && assembleia?.value ? (
          <ClienteTable id={assembleia?.value}></ClienteTable>
        ) : null}
      </Template>
    </>
  );
}
