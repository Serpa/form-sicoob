import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { Button } from "antd";
import { useSnackbar } from "notistack";
import { CommentOutlined } from "@ant-design/icons/";
import { Input, Space } from "antd";

export default function GetData() {
  const { enqueueSnackbar } = useSnackbar();
  const [doc, setDoc] = useState();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const handleMongo = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/clientes`, {
        assembleia: {
          nome: form.assembleia,
          data: new Date(),
        },
        clientes: doc,
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
    const workbook = XLSX.read(data);
    console.log(workbook);
    var ws = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
      raw: false,
      header: [
        "numeroPA",
        "nomeCliente",
        "numeroCPF_CNPJ",
        "nomeGerente",
        "idade",
      ],
      range: 1,
    });
    console.log(ws);
    setDoc(ws);
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
