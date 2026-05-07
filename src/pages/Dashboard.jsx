import { useState } from "react"

import CardsResumo from "../components/CardsResumo"
import TabelaModulos from "../components/TabelaModulos"

export default function Dashboard({
  modulos,
  aulas
}) {

  // =========================
  // PAGINAÇÃO
  // =========================
  const [pagina, setPagina] =
    useState(1)

  const modulosPorPagina = 7

  const inicio =
    (pagina - 1) * modulosPorPagina

  const fim =
    inicio + modulosPorPagina

  const modulosPaginados =
    modulos.slice(inicio, fim)

  const totalPaginas =
    Math.ceil(
      modulos.length / modulosPorPagina
    )

  return (
    <>

      <h1 className="mb-4 text-white">
        Dashboard
      </h1>

      <CardsResumo
        modulos={modulos}
        aulas={aulas}
      />

      <TabelaModulos
        modulos={modulosPaginados}
        aulas={aulas}
        pagina={pagina}
        setPagina={setPagina}
        totalPaginas={totalPaginas}
        inicio={inicio}
      />

    </>
  )
}