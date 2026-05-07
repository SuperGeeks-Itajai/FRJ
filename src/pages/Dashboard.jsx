import CardsResumo from "../components/CardsResumo"
import TabelaModulos from "../components/TabelaModulos"

export default function Dashboard({ modulos, aulas }) {
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
        modulos={modulos}
        aulas={aulas}
      />
    </>
  )
}