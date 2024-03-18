import { Button, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import React, { useContext } from "react";
import Image from "next/image";
import logo from "@/public/images/sicoob-vector-logo.svg";
import { useRouter } from "next/router";
import { ClienteContext } from "contexts/ClienteContext";
import { signOut, useSession } from "next-auth/react";

export default function Template(props) {
  const { handleImagem } = useContext(ClienteContext);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const session = useSession()

  const handleMenu = (e) => {
    switch (e) {
      case "1":
        return router.push("/"), handleImagem(null);
      case "2":
        return router.push("/register"), handleImagem(null);
      case "3":
        return router.push("/export"), handleImagem(null);
      case "4":
        return router.push("/doc"), handleImagem(null);
      case "5":
        return router.push("/raffle"), handleImagem(null);
      case "6":
        return router.push("/adm"), handleImagem(null);
      case "7":
        return router.push("/birthday"), handleImagem(null);
      case "8":
        return router.push("/mobile"), handleImagem(null);
      case "9":
        return router.push("/registerAdmin"), handleImagem(null);
      default:
        break;
    }
  };

  const router = useRouter();
  const itens = [
    {
      key: "1",
      label: "Clientes",
    },
    {
      key: "2",
      label: "Cadastrar",
    },
    {
      key: "3",
      label: "Exportar Excel",
    },
    {
      key: "4",
      label: "Cadastrar Tabela",
    },
    {
      key: "5",
      label: "Sortear",
    },
    {
      key: "6",
      label: "Cadastrar Adm. Empresa",
    },
    {
      key: "7",
      label: "Aniversariantes",
    },
    {
      key: "8",
      label: "Mobile",
    },
    {
      key: "9",
      label: "Cadastro Administrador",
    },
  ];
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { }}
        onCollapse={(collapsed, type) => { }}
      >
        <div className="logo flex justify-center items-center">
          <Image priority height={150} src={logo} alt="logo"></Image>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={props.menu}
          onClick={(e) => handleMenu(e.key)}
          items={itens}
        >
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          className="flex justify-end items-center p-0 gap-2"
        >
          {session.status === 'authenticated' &&
            <>
              <p className="font-bold text-white">{session.data?.user.name}</p>
              <Button className="bg-gray-400 text-black hover:bg-slate-500 border-black" onClick={signOut}>Sair</Button>
            </>
          }
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          {props.children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Sicoob Frutal {new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
