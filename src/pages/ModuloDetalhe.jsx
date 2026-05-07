import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import * as bootstrap from "bootstrap"

import { supabase } from "../supabaseClient"

import FormAula from "../components/FormAula"
import TabelaAulas from "../components/TabelaAulas"
import ModalAula from "../components/ModalAula"

export default function ModuloDetalhe({
  carregarDados
}) {

  const { id } = useParams()

  // =========================
  // STATES
  // =========================
  const [modulo, setModulo] = useState(null)

  const [aulas, setAulas] = useState([])

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] =
    useState("")

  const [aulaSelecionada, setAulaSelecionada] =
    useState(null)

  const [novoNome, setNovoNome] =
    useState("")

  const [novaDescricao, setNovaDescricao] =
    useState("")

  const [pagina, setPagina] = useState(1)

  const aulasPorPagina = 5

  // =========================
  // CARREGAR DADOS
  // =========================
  useEffect(() => {

    async function carregar() {

      const { data: moduloData } =
        await supabase
          .from("modulos")
          .select("*")
          .eq("id", id)
          .single()

      const { data: aulasData } =
        await supabase
          .from("aulas")
          .select("*")
          .eq("modulo_id", id)
          .order("id")

      setModulo(moduloData)
      setAulas(aulasData || [])

    }

    carregar()

  }, [id])

  // =========================
  // ADICIONAR AULA
  // =========================
  async function adicionarAula() {

    if (!nome) return

    const { data } = await supabase
      .from("aulas")
      .insert([
        {
          nome,
          descricao,
          modulo_id: id
        }
      ])
      .select()

    setAulas([
      ...aulas,
      data[0]
    ])

    await carregarDados()

    setNome("")
    setDescricao("")
  }

  // =========================
  // ABRIR MODAL
  // =========================
  function abrirModal(aula) {

    setAulaSelecionada(aula)

    setNovoNome(aula.nome || "")

    setNovaDescricao(
      aula.descricao || ""
    )

    const modal = new bootstrap.Modal(
      document.getElementById("modalAula")
    )

    modal.show()
  }

  // =========================
  // FECHAR MODAL
  // =========================
  function fecharModal() {

    const modalElement =
      document.getElementById("modalAula")

    const modal =
      bootstrap.Modal.getInstance(modalElement)

    modal.hide()
  }

  // =========================
  // EDITAR
  // =========================
  async function salvarEdicao() {

    await supabase
      .from("aulas")
      .update({
        nome: novoNome,
        descricao: novaDescricao
      })
      .eq("id", aulaSelecionada.id)

    const atualizadas = aulas.map(a => {

      if (a.id === aulaSelecionada.id) {

        return {
          ...a,
          nome: novoNome,
          descricao: novaDescricao
        }

      }

      return a

    })

    setAulas(atualizadas)

    await carregarDados()

    fecharModal()
  }

  // =========================
  // EXCLUIR
  // =========================
  async function deletarAula() {

    await supabase
      .from("aulas")
      .delete()
      .eq("id", aulaSelecionada.id)

    setAulas(
      aulas.filter(
        a => a.id !== aulaSelecionada.id
      )
    )

    await carregarDados()

    fecharModal()
  }

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio =
    (pagina - 1) * aulasPorPagina

  const fim = inicio + aulasPorPagina

  const aulasPaginadas =
    aulas.slice(inicio, fim)

  const totalPaginas =
    Math.ceil(
      aulas.length / aulasPorPagina
    )

  if (!modulo) {

    return (
      <p className="text-white">
        Carregando...
      </p>
    )

  }

  return (
    <div className="container">

      {/* TOPO */}
      <div className="mb-4">

        <h1 className="text-danger">
          {modulo.nome}
        </h1>

        <p className="text-secondary">
          {modulo.ferramentas}
        </p>

      </div>

      {/* FORM */}
      <FormAula
        nome={nome}
        setNome={setNome}
        descricao={descricao}
        setDescricao={setDescricao}
        adicionarAula={adicionarAula}
      />

      {/* TABELA */}
      <TabelaAulas
        aulasPaginadas={aulasPaginadas}
        pagina={pagina}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
        abrirModal={abrirModal}
        inicio={inicio}
      />

      {/* MODAL */}
      <ModalAula
        novoNome={novoNome}
        setNovoNome={setNovoNome}
        novaDescricao={novaDescricao}
        setNovaDescricao={setNovaDescricao}
        salvarEdicao={salvarEdicao}
        deletarAula={deletarAula}
      />

    </div>
  )
}