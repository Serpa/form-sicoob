import Template from "../../components/Template";
import Head from "next/head";
import { useEffect, useState } from "react";
import BirthdayTable from "../../components/BirthdayTable";

export default function doc() {
  const [assembleia, setAssembleia] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("assembleia");
      const assembleiaStorage = JSON.parse(item);
      setAssembleia(assembleiaStorage);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Formulário Sicoob - Aniversariantes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Template menu={"7"}>
        {assembleia && <BirthdayTable id={assembleia?.value} />}
      </Template>
    </>
  );
}
