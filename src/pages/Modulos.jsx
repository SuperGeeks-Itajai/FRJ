import { useState } from "react";

import * as bootstrap from "bootstrap";

import { Link } from "react-router-dom";

import { supabase } from "../supabaseClient";

import ModalModulo from "../components/ModalModulo";
import Toast from "../components/Toast";
import ModalConfirmacao from "../components/ModalConfirmacao";

export function FormModulo({
  nome,
  setNome,

  ferramentas,
  setFerramentas,

  adicionarModulo,
}) {
  return (
    <div className="card bg-black border-secondary mb-4">
      <div className="card-body">
        <h5 className="text-white mb-3">Novo Módulo</h5>

        {/* NOME */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nome do módulo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* FERRAMENTAS */}
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Ferramentas utilizadas"
          value={ferramentas}
          onChange={(e) => setFerramentas(e.target.value)}
        />

        {/* BOTÃO */}
        <button className="btn btn-danger" onClick={adicionarModulo}>
          Adicionar Módulo
        </button>
      </div>
    </div>
  );
}

export default function Modulos({ modulos, aulas, busca, carregarDados }) {
  // =========================
  // STATES
  // =========================
  const [nome, setNome] = useState("");

  const [ferramentas, setFerramentas] = useState("");

  const [moduloSelecionado, setModuloSelecionado] = useState(null);

  const [novoNome, setNovoNome] = useState("");

  const [novasFerramentas, setNovasFerramentas] = useState("");

  const [pagina, setPagina] = useState(1);

  // TOAST
  const [toastMensagem, setToastMensagem] = useState("");

  const [toastTipo, setToastTipo] = useState("sucesso");

  const [mostrarToast, setMostrarToast] = useState(false);

  const modulosPorPagina = 10;

  // =========================
  // TOAST
  // =========================
  function mostrarMensagem(mensagem, tipo = "sucesso") {
    setToastMensagem(mensagem);

    setToastTipo(tipo);

    setMostrarToast(true);

    setTimeout(() => {
      setMostrarToast(false);
    }, 3000);
  }

  // =========================
  // ADICIONAR
  // =========================
  async function adicionarModulo() {
    if (!nome) return;

    await supabase.from("modulos").insert([
      {
        nome,
        ferramentas,
      },
    ]);

    setNome("");
    setFerramentas("");

    carregarDados();

    mostrarMensagem("Módulo criado!");
  }

  // =========================
  // ABRIR MODAL
  // =========================
  function abrirModal(modulo) {
    setModuloSelecionado(modulo);

    setNovoNome(modulo.nome);

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
  // EDITAR
  // =========================
  async function salvarEdicao() {
    await supabase
      .from("modulos")
      .update({
        nome: novoNome,
        ferramentas: novasFerramentas,
      })
      .eq("id", moduloSelecionado.id);

    carregarDados();

    mostrarMensagem("Módulo atualizado!");

    fecharModal();
  }

  // =========================
  // EXCLUIR
  // =========================
  async function deletarModulo() {
    const { data: aulas } = await supabase
      .from("aulas")
      .select("id")
      .eq("modulo_id", moduloSelecionado.id);

    if (aulas.length > 0) {
      mostrarMensagem(
        `Não é possível excluir.
Existe(m)
${aulas.length} aula(s)
vinculada(s).`,
        "erro",
      );

      return;
    }

    await supabase.from("modulos").delete().eq("id", moduloSelecionado.id);

    carregarDados();

    mostrarMensagem("Módulo excluído", "erro");

    const modalConfirmacao = bootstrap.Modal.getInstance(
      document.getElementById("modalConfirmacao"),
    );

    modalConfirmacao.hide();

    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    document.body.classList.remove("modal-open");

    document.body.style = "";
  }

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

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio = (pagina - 1) * modulosPorPagina;

  const fim = inicio + modulosPorPagina;

  const modulosPaginados = modulosFiltrados.slice(inicio, fim);

  const totalPaginas = Math.ceil(modulosFiltrados.length / modulosPorPagina);

  return (
    <div className="container">
      <div
        className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
      "
      >
        <div>
          <h1
            className="
            text-danger
            fw-bold
            mb-1
          "
          >
            Módulos
          </h1>

          <p className="text-secondary">Gerencie os módulos da plataforma</p>
        </div>
      </div>

      <FormModulo
        nome={nome}
        setNome={setNome}
        ferramentas={ferramentas}
        setFerramentas={setFerramentas}
        adicionarModulo={adicionarModulo}
      />

      <div
        className="
        card
        bg-black
        border-secondary
      "
      >
        <div className="card-body">
          <h5
            className="
            text-white
            mb-4
          "
          >
            Lista de Módulos
          </h5>

          <div className="table-responsive">
            <table
              className="
              table
              table-dark
              table-hover
              align-middle
            "
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Módulo</th>
                  <th>Ferramentas</th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>

              <tbody>
                {modulosPaginados.map((m, i) => (
                  <tr key={m.id}>
                    <td>
                      <span
                        className="
                        badge
                        bg-dark
                      "
                      >
                        {inicio + i + 1}
                      </span>
                    </td>

                    <td
                      className="
                      fw-semibold
                      text-danger
                    "
                    >
                      {m.nome}
                    </td>

                    <td>{m.ferramentas || "—"}</td>

                    <td className="text-center">
                      <div
                        className="
                        d-flex
                        justify-content-center
                        gap-2
                      "
                      >
                        <Link
                          to={`/modulos/${m.id}`}
                          className="
                            btn
                            btn-sm
                            btn-outline-light
                          "
                        >
                          Abrir
                        </Link>

                        <button
                          className="
                            btn
                            btn-sm
                            btn-danger
                          "
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
          </div>

          {/* PAGINAÇÃO */}
          <div
            className="
            d-flex
            justify-content-between
            align-items-center
            mt-3
          "
          >
            <p
              className="
              text-white
              mb-0
            "
            >
              {`Página ${pagina} de ${totalPaginas}`}
            </p>

            <div
              className="
              d-flex
              gap-2
            "
            >
              <button
                className="
                  btn
                  btn-outline-light
                  btn-sm
                "
                disabled={pagina === 1}
                onClick={() => setPagina(pagina - 1)}
              >
                Anterior
              </button>

              <button
                className="
                  btn
                  btn-outline-light
                  btn-sm
                "
                disabled={pagina === totalPaginas}
                onClick={() => setPagina(pagina + 1)}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>

      <ModalModulo
        novoNome={novoNome}
        setNovoNome={setNovoNome}
        novasFerramentas={novasFerramentas}
        setNovasFerramentas={setNovasFerramentas}
        salvarEdicao={salvarEdicao}
        deletarModulo={deletarModulo}
      />

      <Toast mensagem={toastMensagem} tipo={toastTipo} mostrar={mostrarToast} />

      <ModalConfirmacao
        titulo="Confirmar Exclusão"
        mensagem={`
Deseja realmente excluir:
"${moduloSelecionado?.nome}" ?
`}
        onConfirmar={deletarModulo}
      />
    </div>
  );
}
