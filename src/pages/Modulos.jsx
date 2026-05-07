import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as bootstrap from "bootstrap";

import { supabase } from "../supabaseClient";

export default function Modulos() {
  // =========================
  // STATES
  // =========================
  const [modulos, setModulos] = useState([]);

  const [busca, setBusca] = useState("");

  const [pagina, setPagina] = useState(1);

  const [moduloSelecionado, setModuloSelecionado] = useState(null);

  const [novoNome, setNovoNome] = useState("");
  const [novasFerramentas, setNovasFerramentas] = useState("");

  const [nome, setNome] = useState("");
  const [ferramentas, setFerramentas] = useState("");

  const porPagina = 5;

  // =========================
  // CARREGAR DADOS
  // =========================
  useEffect(() => {
    async function carregar() {
      const { data } = await supabase
        .from("modulos")
        .select(
          `
          *,
          aulas (
            id
          )
        `,
        )
        .order("nome");

      setModulos(data || []);
    }

    carregar();
  }, []);

  // =========================
  // ADICIONAR MÓDULO
  // =========================
  async function adicionarModulo() {
    if (!nome) return;

    const { data } = await supabase.from("modulos").insert([
      {
        nome,
        ferramentas,
      },
    ]).select(`
        *,
        aulas (
          id
        )
      `);

    setModulos([...modulos, data[0]]);

    setNome("");
    setFerramentas("");
  }

  // =========================
  // ABRIR MODAL
  // =========================
  function abrirModal(modulo) {
    setModuloSelecionado(modulo);

    setNovoNome(modulo.nome || "");
    setNovasFerramentas(modulo.ferramentas || "");

    const modal = new bootstrap.Modal(document.getElementById("modalModulo"));

    modal.show();
  }

  // =========================
  // FECHAR MODAL
  // =========================
  function fecharModal() {
    const modalElement = document.getElementById("modalModulo");

    const modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();
  }

  // =========================
  // EDITAR MÓDULO
  // =========================
  async function salvarEdicao() {
    await supabase
      .from("modulos")
      .update({
        nome: novoNome,
        ferramentas: novasFerramentas,
      })
      .eq("id", moduloSelecionado.id);

    const atualizados = modulos.map((m) => {
      if (m.id === moduloSelecionado.id) {
        return {
          ...m,
          nome: novoNome,
          ferramentas: novasFerramentas,
        };
      }

      return m;
    });

    setModulos(atualizados);

    fecharModal();
  }

  // =========================
  // DELETAR MÓDULO
  // =========================
  async function deletarModulo() {
    await supabase.from("modulos").delete().eq("id", moduloSelecionado.id);

    setModulos(modulos.filter((m) => m.id !== moduloSelecionado.id));

    fecharModal();
  }

  // =========================
  // FILTRO
  // =========================
  const modulosFiltrados = modulos.filter((m) =>
    m.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio = (pagina - 1) * porPagina;
  const fim = inicio + porPagina;

  const modulosPaginados = modulosFiltrados.slice(inicio, fim);

  const totalPaginas = Math.ceil(modulosFiltrados.length / porPagina);

  // =========================
  // MÉTRICAS
  // =========================
  const totalAulas = modulos.reduce(
    (acc, modulo) => acc + (modulo.aulas?.length || 0),
    0,
  );

  return (
    <div className="container">
      {/* TOPO */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-danger mb-1">Módulos</h1>

          <p className="text-secondary">Gerencie todos os módulos do sistema</p>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card bg-black border-secondary h-100">
            <div className="card-body">
              <h6 className="text-secondary">Total de módulos</h6>

              <h2 className="text-white">{modulos.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card bg-black border-secondary h-100">
            <div className="card-body">
              <h6 className="text-secondary">Total de aulas</h6>

              <h2 className="text-white">{totalAulas}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="card bg-black border-secondary mb-4">
        <div className="card-body">
          <h5 className="mb-3 text-white">Novo módulo</h5>

          <input
            className="form-control mb-2"
            placeholder="Nome do módulo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Ferramentas"
            value={ferramentas}
            onChange={(e) => setFerramentas(e.target.value)}
          />

          <button className="btn btn-danger" onClick={adicionarModulo}>
            Adicionar módulo
          </button>
        </div>
      </div>

      {/* BUSCA */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Buscar módulo..."
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
        />
      </div>

      {/* TABELA */}
      <div className="card bg-black border-secondary">
        <div className="card-body">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Módulo</th>
                <th>Ferramentas</th>
                <th>Aulas</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {modulosPaginados.map((m, index) => (
                <tr key={m.id}>
                  <td>{inicio + index + 1}</td>

                  <td>
                    <Link
                      to={`/modulos/${m.id}`}
                      className="text-danger text-decoration-none fw-bold"
                    >
                      {m.nome}
                    </Link>
                  </td>

                  <td>{m.ferramentas}</td>

                  <td>{m.aulas?.length || 0}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/modulos/${m.id}`}
                        className="btn btn-sm btn-outline-light"
                      >
                        Abrir
                      </Link>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => abrirModal(m)}
                      >
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINAÇÃO */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              className="btn btn-outline-light"
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
            >
              ←
            </button>

            <span className="align-self-center text-white">
              Página {pagina} de {totalPaginas || 1}
            </span>

            <button
              className="btn btn-outline-light"
              disabled={pagina === totalPaginas || totalPaginas === 0}
              onClick={() => setPagina(pagina + 1)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="modalModulo" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content bg-black text-white">
            <div className="modal-header">
              <h5 className="modal-title">Editar módulo</h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-3"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
              />

              <input
                className="form-control"
                value={novasFerramentas}
                onChange={(e) => setNovasFerramentas(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>

              <button className="btn btn-danger" onClick={deletarModulo}>
                Excluir
              </button>

              <button className="btn btn-success" onClick={salvarEdicao}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
