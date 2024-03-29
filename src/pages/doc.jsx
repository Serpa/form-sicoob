import GetData from "components/GetData";
import Template from "../../components/Template";
import Head from "next/head";

export default function Doc() {
  return (
    <>
      <Head>
        <title>Formulário Sicoob - Importar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template menu={"4"}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fffff",
          }}
          className="flex justify-center items-center flex-col"
        >
          <GetData></GetData>
        </div>
      </Template>
    </>
  );
}
