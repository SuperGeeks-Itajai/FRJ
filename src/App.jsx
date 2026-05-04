import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import Navbar from "./components/Navbar"
import TabelaModulos from "./components/TabelaModulos"
import CardAula from "./components/CardAula"
import ModalAula from "./components/ModalAula"

export default function App() {
  const [modulos, setModulos] = useState([])
  const [aulas, setAulas] = useState([])
  const [busca, setBusca] = useState("")

  // 🔹 controle do modal
  const [aulaSelecionada, setAulaSelecionada] = useState(null)
  const [nomeEdit, setNomeEdit] = useState("")
  const [descricaoEdit, setDescricaoEdit] = useState("")

  // 🔹 carregar dados
  async function carregarDados() {
    const { data: mod } = await supabase.from("modulos").select("*")
    const { data: aulasData } = await supabase.from("aulas").select("*")

    setModulos(mod || [])
    setAulas(aulasData || [])
  }

  useEffect(() => {
    async function fetchData() {
      await carregarDados()
    }
    fetchData()
  }, [])

  // 🔹 abrir modal (SEM useEffect 🔥)
  function abrirModal(aula) {
    setAulaSelecionada(aula)
    setNomeEdit(aula.nome ?? "")
    setDescricaoEdit(aula.descricao ?? "")
  }

  // 🔹 filtro de busca
  const aulasFiltradas = aulas.filter(a =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <>
      <Navbar busca={busca} setBusca={setBusca} />

      <main className="d-flex w-100 text-center">
        <div className="cover-container mx-auto px-3 text-white">

          <h1 className="mb-3">Dashboard SuperGeeks</h1>
          <p className="lead">
            Gerencie módulos, aulas e conteúdos.
          </p>

          <TabelaModulos modulos={modulos} aulas={aulas} />

          {/* 🔹 mostra primeira aula filtrada */}
          {aulasFiltradas.length > 0 && (
            <CardAula
              aula={aulasFiltradas[0]}
              onClick={abrirModal}
            />
          )}

        </div>
      </main>

      <ModalAula
        aula={aulaSelecionada}
        nome={nomeEdit}
        setNome={setNomeEdit}
        descricao={descricaoEdit}
        setDescricao={setDescricaoEdit}
        fechar={() => setAulaSelecionada(null)}
        atualizarLista={carregarDados}
      />
    </>
  )
}