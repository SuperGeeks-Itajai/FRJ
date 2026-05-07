import { useEffect, useState } from "react"

import * as bootstrap from "bootstrap"

import { Link } from "react-router-dom"

import { supabase } from "../supabaseClient"

import FormModulo from "../components/FormModulo"
import ModalModulo from "../components/ModalModulo"

export default function Modulos() {

  // =========================
  // STATES
  // =========================
  const [modulos, setModulos] =
    useState([])

  const [aulas, setAulas] =
    useState([])

  const [nome, setNome] =
    useState("")

  const [ferramentas, setFerramentas] =
    useState("")

  const [moduloSelecionado,
    setModuloSelecionado] =
    useState(null)

  const [novoNome,
    setNovoNome] =
    useState("")

  const [novasFerramentas,
    setNovasFerramentas] =
    useState("")

  const [pagina,
    setPagina] =
    useState(1)

  const modulosPorPagina = 10

  // =========================
  // CARREGAR DADOS
  // =========================
  useEffect(() => {

    async function carregar() {

      const { data: modulosData } =
        await supabase
          .from("modulos")
          .select("*")
          .order("id")

      const { data: aulasData } =
        await supabase
          .from("aulas")
          .select("*")

      setModulos(modulosData || [])
      setAulas(aulasData || [])

    }

    carregar()

  }, [])

  // =========================
  // CONTAR AULAS
  // =========================
  function contarAulas(id) {

    return aulas.filter(
      a => a.modulo_id === id
    ).length

  }

  // =========================
  // ADICIONAR MÓDULO
  // =========================
  async function adicionarModulo() {

    if (!nome) return

    const { data } = await supabase
      .from("modulos")
      .insert([
        {
          nome,
          ferramentas
        }
      ])
      .select()

    setModulos([
      ...modulos,
      data[0]
    ])

    setNome("")
    setFerramentas("")

  }

  // =========================
  // ABRIR MODAL
  // =========================
  function abrirModal(modulo) {

    setModuloSelecionado(modulo)

    setNovoNome(modulo.nome || "")

    setNovasFerramentas(
      modulo.ferramentas || ""
    )

    const modal = new bootstrap.Modal(
      document.getElementById("modalModulo")
    )

    modal.show()

  }

  // =========================
  // FECHAR MODAL
  // =========================
  function fecharModal() {

    const modalElement =
      document.getElementById("modalModulo")

    const modal =
      bootstrap.Modal.getInstance(modalElement)

    modal.hide()

  }

  // =========================
  // SALVAR EDIÇÃO
  // =========================
  async function salvarEdicao() {

    await supabase
      .from("modulos")
      .update({
        nome: novoNome,
        ferramentas: novasFerramentas
      })
      .eq("id", moduloSelecionado.id)

    const atualizados =
      modulos.map(m => {

        if (
          m.id === moduloSelecionado.id
        ) {

          return {
            ...m,
            nome: novoNome,
            ferramentas: novasFerramentas
          }

        }

        return m

      })

    setModulos(atualizados)

    fecharModal()

  }

  // =========================
  // DELETAR
  // =========================
  async function deletarModulo() {

    await supabase
      .from("modulos")
      .delete()
      .eq("id", moduloSelecionado.id)

    setModulos(
      modulos.filter(
        m => m.id !== moduloSelecionado.id
      )
    )

    fecharModal()

  }

  // =========================
  // PAGINAÇÃO
  // =========================
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

    <div className="container">

      {/* TOPO */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h1 className="text-danger">
            Módulos
          </h1>

          <p className="text-secondary mb-0">
            Gerencie todos os módulos
          </p>

        </div>

      </div>

      {/* FORM */}
      <FormModulo

        nome={nome}
        setNome={setNome}

        ferramentas={ferramentas}
        setFerramentas={setFerramentas}

        adicionarModulo={adicionarModulo}

      />

      {/* TABELA */}
      <div className="card bg-black border-secondary">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-dark table-hover align-middle">

              <thead>

                <tr>

                  <th>#</th>
                  <th>Módulo</th>
                  <th>Ferramentas</th>
                  <th>Aulas</th>
                  <th width="220">
                    Ações
                  </th>

                </tr>

              </thead>

              <tbody>

                {modulosPaginados.map((m, i) => (

                  <tr key={m.id}>

                    <td>
                      {inicio + i + 1}
                    </td>

                    <td className="text-danger fw-bold">
                      {m.nome}
                    </td>

                    <td>
                      {m.ferramentas}
                    </td>

                    <td>
                      {contarAulas(m.id)}
                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <Link
                          to={`/modulos/${m.id}`}
                          className="btn btn-danger btn-sm"
                        >
                          Abrir
                        </Link>

                        <button
                          className="btn btn-outline-light btn-sm"
                          onClick={() =>
                            abrirModal(m)
                          }
                        >
                          Editar
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINAÇÃO */}
          <div className="d-flex justify-content-between align-items-center mt-4">

            <button
              className="btn btn-outline-light"
              disabled={pagina === 1}
              onClick={() =>
                setPagina(pagina - 1)
              }
            >
              Anterior
            </button>

            <span className="text-white">

              Página {pagina} de {totalPaginas}

            </span>

            <button
              className="btn btn-outline-light"
              disabled={
                pagina === totalPaginas
              }
              onClick={() =>
                setPagina(pagina + 1)
              }
            >
              Próxima
            </button>

          </div>

        </div>

      </div>

      {/* MODAL */}
      <ModalModulo

        novoNome={novoNome}
        setNovoNome={setNovoNome}

        novasFerramentas={novasFerramentas}
        setNovasFerramentas={setNovasFerramentas}

        salvarEdicao={salvarEdicao}
        deletarModulo={deletarModulo}

      />

    </div>

  )

}