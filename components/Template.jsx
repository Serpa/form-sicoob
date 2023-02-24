import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import React, { useContext } from "react";
import Image from "next/image";
import logo from "@/public/images/sicoob-vector-logo.svg";
import { useRouter } from "next/router";
import { ClienteContext } from "contexts/ClienteContext";

export default function Template(props) {
  const { handleImagem } = useContext(ClienteContext);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenu = (e) => {
    switch (e) {
      case "1":
        return router.push("/"), handleImagem(null);
      case "2":
        return router.push("/register"),handleImagem(null);
      case "3":
        return router.push("/export"),handleImagem(null);
      case "4":
        return router.push("/doc"),handleImagem(null);
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
  ];
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
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
        {/* <Header
          style={{
            padding: 0,
            background: "#001529",
          }}
        /> */}
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
          Sicoob 2023
        </Footer>
      </Layout>
    </Layout>
  );
}
