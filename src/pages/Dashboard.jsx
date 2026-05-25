import { useState } from "react";

import CardsResumo from "../components/CardsResumo";
import TabelaModulos from "../components/TabelaModulos";

export default function Dashboard({ modulos, aulas, busca }) {
  const [pagina, setPagina] = useState(1);

  // =========================
  // FILTRO
  // =========================
  const modulosFiltrados = modulos.filter((m) => {
    const textoModulo = `
      ${m.nome}
      ${m.ferramentas}
    `.toLowerCase();

    const encontrouModulo = textoModulo.includes(busca.toLowerCase());

    const encontrouAula = aulas.some(
      (aula) =>
        aula.modulo_id === m.id &&
        `
            ${aula.nome}
            ${aula.descricao}
          `
          .toLowerCase()
          .includes(busca.toLowerCase()),
    );

    return encontrouModulo || encontrouAula;
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

      <CardsResumo modulos={modulos} aulas={aulas} />

      <TabelaModulos
        modulos={modulosFiltrados}
        aulas={aulas}
        pagina={pagina}
        setPagina={setPagina}
      />
    </>
  );
}
