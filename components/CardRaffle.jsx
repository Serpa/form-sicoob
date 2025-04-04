import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Checkbox, Select } from "antd";
import useSWR from "swr";
import axios from "axios";
import { Spin } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Image from "next/image";
const { Meta } = Card;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function CardRaffle(props) {
  const [tipoSorteio, setTipoSorteio] = useState('todos');
  const [loading, setLoading] = useState(false);
  const [ganhador, setGanhador] = useState(null);
  const { data, error, isLoading } = useSWR("/api/countPresence/" + props.assembleia?.value,
    fetcher
  );
  const count = useMemo(() => {
    if (!data) return 0;
    return data.filter(client => {
      if (tipoSorteio === "associados") return client.associado;
      if (tipoSorteio === "naoAssociados") return !client.associado;
      return true;
    }).length;
  }, [data, tipoSorteio]);

  const countAptos = useMemo(() => {
    if (!data) return 0;
    return data.filter(client => {
      if (tipoSorteio === "associados") return client.associado;
      if (tipoSorteio === "naoAssociados") return !client.associado;
      return true;
    }).filter(client => !client.sorteado).length;
  }, [data, tipoSorteio]);


  const handleRaffle = async () => {
    setGanhador(null);
    setLoading(true);
    const result = await axios.post("/api/raffle", {
      assembleiaId: props.assembleia?.value,
      tipoSorteio: tipoSorteio
    });
    setTimeout(() => {
      setGanhador(result.data[0]);
      setLoading(false);
    }, 1500);
  };

  const handleTipoSorteio = (e) => {
    setTipoSorteio(e)

  }

  if (error) return <h1>Selecione uma Assembleia</h1>;
  if (isLoading || !props.assembleia?.value)
    return (
      <div>
        <Spin />
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-around w-full">
        <Card
          title="Assembleia"
          bordered={false}
          style={{ width: 300 }}
          className="flex justify-center items-center flex-col m-2"
        >
          <h1 className="font-bold">{props.assembleia.label.toUpperCase()}</h1>
        </Card>
        {countAptos > 0 && (
          <div className="flex flex-col space-y-5">
            <Button
              type="default"
              icon={<SmileOutlined />}
              loading={loading}
              size={"large"}
              onClick={handleRaffle}
            >
              Sortear
            </Button>
            {/* <Checkbox className="justify-center" checked={associado} onChange={e => setAssociado(e.target.checked)} >Associado</Checkbox> */}

          </div>
        )}
        <Select
          className="w-40"
          showSearch
          placeholder="Selecione o tipo de sorteio."
          optionFilterProp="label"
          onChange={e => handleTipoSorteio(e)}
          defaultValue={'todos'}
          options={[
            {
              value: 'associados',
              label: 'Associados',
            },
            {
              value: 'naoAssociados',
              label: 'Não Associados',
            },
            {
              value: 'todos',
              label: 'Todos',
            },
          ]}
        />
        <Card
          title="Clientes Presentes"
          bordered={false}
          style={{ width: 300 }}
          className="flex justify-center items-center flex-col m-2"
        >
          <h1 className="text-3xl font-bold">{count}</h1>
        </Card>
        <Card
          title="Clientes Aptos"
          bordered={false}
          style={{ width: 300 }}
          className="flex justify-center items-center flex-col m-2"
        >
          <h1 className="text-3xl font-bold">{countAptos}</h1>
        </Card>
      </div>
      <div className="flex items-center justify-around w-full">
        {loading ? <Spin size="large" /> : null}
        {ganhador ? (
          <Card
            className="m-5"
            hoverable
            cover={
              <Image
                src={ganhador.foto.replace("./public", "")}
                alt={ganhador.nomeCliente}
                width={400}
                height={400}
              ></Image>
            }
          >
            <Meta title={ganhador.nomeCliente} description={ganhador.nomeAdm} />
          </Card>
        ) : null}
      </div>
    </>
  );
}
