import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as bootstrap from "bootstrap";

import { supabase } from "../supabaseClient";

export default function ModuloDetalhe() {
  const { id } = useParams();

  const [modulo, setModulo] = useState(null);
  const [aulas, setAulas] = useState([]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [busca, setBusca] = useState("");

  const [pagina, setPagina] = useState(1);

  const [aulaSelecionada, setAulaSelecionada] = useState(null);

  const [editandoNome, setEditandoNome] = useState("");
  const [editandoDescricao, setEditandoDescricao] = useState("");

  const aulasPorPagina = 10;

  // =========================
  // CARREGAR DADOS
  // =========================
  useEffect(() => {
    async function carregarDados() {
      // módulo
      const { data: moduloData } = await supabase
        .from("modulos")
        .select("*")
        .eq("id", id)
        .single();

      setModulo(moduloData);

      // aulas
      const { data: aulasData } = await supabase
        .from("aulas")
        .select("*")
        .eq("modulo_id", id)
        .order("nome");

      setAulas(aulasData || []);
    }

    carregarDados();
  }, [id]);

  // =========================
  // CRIAR AULA
  // =========================
  async function adicionarAula() {
    if (!nome) return;

    const { data } = await supabase
      .from("aulas")
      .insert([
        {
          nome,
          descricao,
          modulo_id: id,
        },
      ])
      .select();

    setAulas([...aulas, data[0]]);

    setNome("");
    setDescricao("");
  }

  // =========================
  // ABRIR MODAL
  // =========================
  function abrirModal(aula) {
    setAulaSelecionada(aula);

    setEditandoNome(aula.nome || "");
    setEditandoDescricao(aula.descricao || "");

    const modal = new bootstrap.Modal(document.getElementById("modalAula"));

    modal.show();
  }

  // =========================
  // EDITAR AULA
  // =========================
  async function salvarEdicao() {
    await supabase
      .from("aulas")
      .update({
        nome: editandoNome,
        descricao: editandoDescricao,
      })
      .eq("id", aulaSelecionada.id);

    const atualizadas = aulas.map((a) => {
      if (a.id === aulaSelecionada.id) {
        return {
          ...a,
          nome: editandoNome,
          descricao: editandoDescricao,
        };
      }

      return a;
    });

    setAulas(atualizadas);

    fecharModal();
  }

  // =========================
  // DELETAR AULA
  // =========================
  async function deletarAula() {
    await supabase.from("aulas").delete().eq("id", aulaSelecionada.id);

    setAulas(aulas.filter((a) => a.id !== aulaSelecionada.id));

    fecharModal();
  }

  // =========================
  // FECHAR MODAL
  // =========================
  function fecharModal() {
    const modalElement = document.getElementById("modalAula");

    const modal = bootstrap.Modal.getInstance(modalElement);

    modal.hide();
  }

  // =========================
  // FILTRO
  // =========================
  const aulasFiltradas = aulas.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio = (pagina - 1) * aulasPorPagina;
  const fim = inicio + aulasPorPagina;

  const aulasPaginadas = aulasFiltradas.slice(inicio, fim);

  const totalPaginas = Math.ceil(aulasFiltradas.length / aulasPorPagina);

  // =========================
  // LOADING
  // =========================
  if (!modulo) {
    return (
      <div className="container">
        <h3>Carregando...</h3>
      </div>
    );
  }

  return (
    <div className="container">
      {/* TOPO */}
      <div className="mb-4">
        <h1 className="text-danger">{modulo.nome}</h1>

        <p className="mb-1">
          <strong>Ferramentas:</strong> {modulo.ferramentas}
        </p>

        <p>
          <strong>Total de aulas:</strong> {aulas.length}
        </p>
      </div>

      {/* FORM NOVA AULA */}
      <div className="card bg-black border-secondary mb-4">
        <div className="card-body">
          <h5 className="mb-3">Nova Aula</h5>

          <input
            className="form-control mb-2"
            placeholder="Nome da aula"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Descrição"
            rows="4"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button className="btn btn-danger" onClick={adicionarAula}>
            Adicionar Aula
          </button>
        </div>
      </div>

      {/* BUSCA */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Buscar aula..."
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
                <th>Nome</th>
                <th>Descrição</th>
              </tr>
            </thead>

            <tbody>
              {aulasPaginadas.map((aula, index) => (
                <tr
                  key={aula.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => abrirModal(aula)}
                >
                  <td>{inicio + index + 1}</td>

                  <td>{aula.nome}</td>

                  <td>{aula.descricao?.slice(0, 80)}</td>
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
      <div className="modal fade" id="modalAula" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-black text-white">
            <div className="modal-header">
              <h5 className="modal-title">Editar Aula</h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-3"
                value={editandoNome}
                onChange={(e) => setEditandoNome(e.target.value)}
              />

              <textarea
                className="form-control"
                rows="8"
                value={editandoDescricao}
                onChange={(e) => setEditandoDescricao(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>

              <button className="btn btn-danger" onClick={deletarAula}>
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
