"use client"

import { useState } from "react"
import { Button, Card, Select, Spin } from "antd"
import { SmileOutlined } from "@ant-design/icons"
import Image from "next/image"
import useSWR from "swr"
import axios from "axios"

const { Meta } = Card

// Improved fetcher with error handling
const fetcher = async (url) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export default function CardRaffle(props) {
  const [tipoSorteio, setTipoSorteio] = useState("todos")
  const [loading, setLoading] = useState(false)
  const [ganhador, setGanhador] = useState(null)
  const [raffleError, setRaffleError] = useState(null)

  // Only fetch if we have a valid assembleia value
  const { data, error, isLoading } = useSWR(
    props.assembleia?.value ? `/api/countPresence/${props.assembleia.value}` : null,
    fetcher,
  )

  // Safely handle data for counting
  const safeData = Array.isArray(data) ? data : []

  // Calculate counts with safe data handling
  const count = safeData.filter((client) => {
    if (tipoSorteio === "associados") return client.associado
    if (tipoSorteio === "naoAssociados") return !client.associado
    return true
  }).length

  const countAptos = safeData
    .filter((client) => {
      if (tipoSorteio === "associados") return client.associado
      if (tipoSorteio === "naoAssociados") return !client.associado
      return true
    })
    .filter((client) => !client.sorteado).length

  const handleRaffle = async () => {
    setGanhador(null)
    setRaffleError(null)
    setLoading(true)

    try {
      const result = await axios.post("/api/raffle", {
        assembleiaId: props.assembleia?.value,
        tipoSorteio: tipoSorteio,
      })

      // The API returns the winner directly, not in an array
      setTimeout(() => {
        setGanhador(result.data)
        setLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error during raffle:", error)
      setRaffleError(error.response?.data?.message || "Erro ao realizar o sorteio")
      setLoading(false)
    }
  }

  const handleTipoSorteio = (value) => {
    setTipoSorteio(value)
  }

  if (error) return <h1>Erro ao carregar dados: Selecione uma Assembleia</h1>
  if (isLoading || !props.assembleia?.value)
    return (
      <div className="flex justify-center items-center p-10">
        <Spin size="large" />
      </div>
    )

  return (
    <>
      <div className="flex items-center justify-around w-full flex-wrap">
        <Card
          title="Assembleia"
          bordered={false}
          style={{ width: 300 }}
          className="flex justify-center items-center flex-col m-2"
        >
          <h1 className="font-bold">{props.assembleia.label.toUpperCase()}</h1>
        </Card>

        <div className="flex flex-col space-y-5 m-2">
          {countAptos > 0 ? (
            <Button type="default" icon={<SmileOutlined />} loading={loading} size={"large"} onClick={handleRaffle}>
              Sortear
            </Button>
          ) : (
            <div className="text-red-500">Não há clientes aptos para sorteio</div>
          )}

          <Select
            className="w-40"
            showSearch
            placeholder="Selecione o tipo de sorteio"
            optionFilterProp="label"
            onChange={handleTipoSorteio}
            defaultValue={"todos"}
            options={[
              {
                value: "associados",
                label: "Associados",
              },
              {
                value: "naoAssociados",
                label: "Não Associados",
              },
              {
                value: "todos",
                label: "Todos",
              },
            ]}
          />
        </div>

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
        {raffleError ? <div className="text-red-500">{raffleError}</div> : null}

        {ganhador && (
          <Card
            className="m-5"
            hoverable
            cover={
              ganhador.foto ? (
                <Image
                  src={ganhador.foto.replace("./public", "") || "/placeholder.svg"}
                  alt={ganhador.nomeCliente || "Ganhador"}
                  width={400}
                  height={400}
                />
              ) : (
                <div className="h-[400px] w-[400px] bg-gray-200 flex items-center justify-center">
                  <p>Sem foto</p>
                </div>
              )
            }
          >
            <Meta
              title={ganhador.nomeCliente || "Nome não disponível"}
              description={ganhador.nomeAdm || "Administrador não disponível"}
            />
          </Card>
        )}
      </div>
    </>
  )
}
