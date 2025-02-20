import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Modal, Popconfirm } from "antd";
import Image from "next/image";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import useSWR from "swr";
import RegisterModal from "@/components/Modal";
import axios from "axios";
import { useSnackbar } from "notistack";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import Loader from "@/components/LoadingComp";
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function BirthdayTable(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [cliente, setCliente] = useState("");
  const searchInput = useRef(null);
  const { data, error, mutate, isLoading } = useSWR(
    "/api/birthday/" + props.id,
    fetcher,
    {
      refreshInterval: 1500,
    }
  );

  const handleCancelPresence = async (record) => {
    const cancel = await axios.post("/api/cancel", record);
    if (cancel.status === 200) {
      enqueueSnackbar("Presença retirada com sucesso!", { variant: "success" });
    } else {
      enqueueSnackbar("Erro ao retirar presença!", { variant: "error" });
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (record) => {
    setCliente(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    saveAs(
      cliente.foto?.replace("./public", ""),
      cliente.nomeCliente + ".jpeg"
    );
    setIsModalOpen(false);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Procurar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="default"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Procurar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Foto",
      dataIndex: "foto",
      key: "foto",
      width: "5%",
      render: (text, record, index) => (
        <div className="btn-wrap">
          {record.foto ? (
            <div onClick={() => showModal(record)}>
              <Image
                width={50}
                height={50}
                alt={record.nomeCliente}
                src={record.foto.replace("./public", "")}
              />
            </div>
          ) : null}
        </div>
      ),
    },
    {
      title: "Número PA",
      dataIndex: "numeroPA",
      key: "numeroPA",
      width: "5%",
      ...getColumnSearchProps("numeroPA"),
    },
    {
      title: "Nome Cliente",
      dataIndex: "nomeCliente",
      key: "nomeCliente",
      width: "30%",
      ...getColumnSearchProps("nomeCliente"),
    },
    {
      title: "CPF/CNPJ",
      dataIndex: "numeroCPF_CNPJ",
      key: "numeroCPF_CNPJ",
      width: "20%",
      ...getColumnSearchProps("numeroCPF_CNPJ"),
    },
    {
      title: "Nome Gerente",
      dataIndex: "nomeGerente",
      key: "nomeGerente",
      width: "30%",
      ...getColumnSearchProps("nomeGerente"),
    },
    {
      title: "Data de Nascimento",
      dataIndex: ["dataNascimento", "idade"],
      key: "dataNascimento",
      width: "30%",
      render: (text, record) => {
        if (record.idade) {
          return record.idade;
        } else {
          return record.dataNascimento.$date;
        }
      },
    },
    {
      title: "Presença",
      dataIndex: "presence",
      key: "presence",
      align: "center",
      render: (text, record, index) => (
        <div className="btn-wrap">
          {record.presente ? (
            <Popconfirm
              placement="top"
              title={record.nomeCliente}
              description={"Você deseja remover a presença?"}
              onConfirm={() => handleCancelPresence(record)}
              okType="default"
              okText="Sim"
              cancelText="Não"
            >
              <CheckCircleOutlined style={{ color: "#33ff00" }} />
            </Popconfirm>
          ) : (
            <CloseCircleOutlined style={{ color: "#ff0000" }} />
          )}
        </div>
      ),
    }
  ];
  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader />;
  return (
    <>
      <Table
        expandable
        size="large"
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
      <Modal
        title={cliente.nomeCliente}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="download" onClick={handleDownload}>
            Download
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Voltar
          </Button>,
        ]}
      >
        <div className="mx-auto max-w-lg text-center flex justify-center items-center">
          <Image
            width={400}
            height={400}
            alt={cliente.nomeCliente}
            src={cliente.foto?.replace("./public", "")}
          ></Image>
        </div>
      </Modal>
    </>
  );
}
