import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import useSWR from "swr";
import axios from "axios";
import { Spin } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Image from "next/image";
const { Meta } = Card;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function CardRaffle(props) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ganhador, setGanhador] = useState(null);
  const { data, error, isLoading } = useSWR(
    mounted ? "/api/countPresence/" + props.assembleia?.value : null,
    fetcher
  );

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleRaffle = async () => {
    setGanhador(null);
    setLoading(true);
    const result = await axios.post("/api/raffle", {
      assembleiaId: props.assembleia?.value,
    });
    setTimeout(() => {
      setGanhador(result.data[0]);
      setLoading(false);
    }, 1500);
  };

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
        {data > 0 ? (
          <Button
            type="default"
            icon={<SmileOutlined />}
            loading={loading}
            size={"large"}
            onClick={handleRaffle}
          >
            Sortear
          </Button>
        ) : null}
        <Card
          title="Clientes Presentes"
          bordered={false}
          style={{ width: 300 }}
          className="flex justify-center items-center flex-col m-2"
        >
          <h1 className="text-3xl font-bold">{data}</h1>
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
