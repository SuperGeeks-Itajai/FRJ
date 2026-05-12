import { useState } from "react";

import CardsResumo from "../components/CardsResumo";
import TabelaModulos from "../components/TabelaModulos";

export default function Dashboard({

  modulos,
  aulas,
  busca

}) {

  const [pagina, setPagina] =
    useState(1);

  // =========================
  // FILTRO
  // =========================
  const modulosFiltrados =
    modulos.filter((m) => {

      const texto = `
        ${m.nome}
        ${m.ferramentas}
      `.toLowerCase();

      return texto.includes(
        busca.toLowerCase()
      );

    });

  return (

    <>

      <h1
        className="
          mb-4
          text-white
        "
      >
        Dashboard
      </h1>

      <CardsResumo
        modulos={modulos}
        aulas={aulas}
      />

      <TabelaModulos
        modulos={modulosFiltrados}
        aulas={aulas}

        pagina={pagina}
        setPagina={setPagina}
      />

    </>

  );

}