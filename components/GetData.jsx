import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { Button } from "antd";
import { useSnackbar } from "notistack";
import { CommentOutlined } from "@ant-design/icons/";
import { Input, Space } from "antd";
import dayjs from "dayjs";

export default function GetData() {
  const { enqueueSnackbar } = useSnackbar();
  const [doc, setDoc] = useState();
  const [doc2, setDoc2] = useState();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const handleMongo = async () => {
    setLoading(true);
    const clientes = doc.map((cliente) => {
      let adms = doc2.filter(
        (adm) => adm.numeroCPF_CNPJ === cliente.numeroCPF_CNPJ
      );
      if (adms.length > 0) {
        return {
          nomeCliente: cliente.nomeCliente,
          nomeGerente: cliente.nomeGerente,
          dataNascimento: dayjs(cliente.dataNascimento).toISOString(),
          numeroCPF_CNPJ: cliente.numeroCPF_CNPJ,
          numeroPA: parseInt(cliente.numeroPA),
          Administradores: adms,
        };
      }
      return {
        nomeCliente: cliente.nomeCliente,
        nomeGerente: cliente.nomeGerente,
        dataNascimento: dayjs(cliente.dataNascimento).toISOString(),
        numeroCPF_CNPJ: cliente.numeroCPF_CNPJ,
        numeroPA: parseInt(cliente.numeroPA),
      };
    });
    try {
      const res = await axios.post(`/api/clientes`, {
        assembleia: {
          nome: form.assembleia,
          data: new Date(),
        },
        clientes: clientes,
        adms: doc2,
      });
      const result = res.data;
      console.log(result);
      enqueueSnackbar("Documento salvo com sucesso!", { variant: "success" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Erro ao salvar documento!", { variant: "error" });
      setLoading(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file === undefined) return null;
    const data = await file.arrayBuffer();
    const workbook = XLSX.readFile(data, { cellDates: true });
    var ws = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
      raw: true,
      header: [
        "numeroPA",
        "nomeCliente",
        "numeroCPF_CNPJ",
        "nomeGerente",
        "dataNascimento",
      ],
      range: 1,
      dateNF: "DD/MM/YYYY",
    });
    var ws2 = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[1]],
      {
        raw: false,
        header: ["numeroCPF_CNPJ", "nomeCliente", "nomeAdm", "descricao"],
        range: 1,
      }
    );
    setDoc(ws);
    setDoc2(ws2);
  };
  const handleXls = () => {
    const worksheet = XLSX.utils.json_to_sheet(doc);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, "Output.xlsx", { compression: true });
  };

  return (
    <>
      <div className="m-5">
        <Input
          prefix={<CommentOutlined />}
          placeholder="Nome da Assembleia"
          value={form.assembleia}
          onChange={(e) => setForm({ assembleia: e.target.value })}
        />
      </div>
      <div className="m-5">
        <input type="file" onChange={(e) => handleFile(e)} />
      </div>
      <div>
        {form.assembleia?.length > 4 && doc ? (
          <Button onClick={handleMongo} loading={loading}>
            Substituir arquivo
          </Button>
        ) : null}
      </div>
    </>
  );
}
