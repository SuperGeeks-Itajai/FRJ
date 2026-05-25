import { useState } from "react";
import * as bootstrap from "bootstrap";

import ModalAula from "../components/ModalAula";
import Toast from "../components/Toast";
import ModalConfirmacao from "../components/ModalConfirmacao";
import { supabase } from "../supabaseClient";

export default function Aulas({ aulas, modulos, busca }) {
  const [pagina, setPagina] = useState(1);

  const [ordem, setOrdem] = useState("asc");

  const aulasPorPagina = 20;

  const [aulaSelecionada, setAulaSelecionada] = useState(null);

  const [novoNome, setNovoNome] = useState("");

  const [novaDescricao, setNovaDescricao] = useState("");

  const [toastMensagem, setToastMensagem] = useState("");

  const [toastTipo, setToastTipo] = useState("sucesso");

  const [mostrarToast, setMostrarToast] = useState(false);

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
  // FILTRO
  // =========================
  const aulasFiltradas = aulas.filter((a) => {
    const modulo = modulos.find((m) => m.id === a.modulo_id);

    const texto = `
        ${a.nome}
        ${a.descricao}
        ${modulo?.nome || ""}
      `.toLowerCase();

    return texto.includes(busca.toLowerCase());
  });

  // =========================
  // ORDENAÇÃO
  // =========================
  const aulasOrdenadas = [...aulasFiltradas].sort((a, b) => {
    if (ordem === "asc") {
      return a.nome.localeCompare(b.nome);
    }

    return b.nome.localeCompare(a.nome);
  });

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio = (pagina - 1) * aulasPorPagina;

  const fim = inicio + aulasPorPagina;

  const aulasPaginadas = aulasOrdenadas.slice(inicio, fim);

  const totalPaginas = Math.ceil(aulasOrdenadas.length / aulasPorPagina);

  // =========================
  // AUXILIAR
  // =========================
  function nomeModulo(id) {
    const modulo = modulos.find((m) => m.id === id);

    return modulo?.nome || "-";
  }

  // =========================
  // MODAL
  // =========================
  function abrirModal(aula) {
    setAulaSelecionada(aula);

    setNovoNome(aula.nome || "");

    setNovaDescricao(aula.descricao || "");

    const modal = new bootstrap.Modal(document.getElementById("modalAula"));

    modal.show();
  }

  // =========================
  // EDITAR
  // =========================
  async function salvarEdicao() {
    await supabase
      .from("aulas")
      .update({
        nome: novoNome,
        descricao: novaDescricao,
      })
      .eq("id", aulaSelecionada.id);

    mostrarMensagem("Aula atualizada!");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // =========================
  // EXCLUIR
  // =========================
  async function deletarAula() {
    await supabase.from("aulas").delete().eq("id", aulaSelecionada.id);

    mostrarMensagem("Aula excluída", "erro");

    const modalConfirmacao = bootstrap.Modal.getInstance(
      document.getElementById("modalConfirmacao"),
    );

    if (modalConfirmacao) {
      modalConfirmacao.hide();
    }

    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

    document.body.classList.remove("modal-open");

    document.body.style = "";

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  function abrirConfirmacao() {
    const modal = new bootstrap.Modal(
      document.getElementById("modalConfirmacao"),
    );

    modal.show();
  }
  return (
    <div className="container">
      <div className="mb-4">
        <h1
          className="
            text-danger
            fw-bold
            mb-1
          "
        >
          Aulas
        </h1>

        <p className="text-secondary">Gerencie todas as aulas cadastradas</p>
      </div>

      <div
        className="
          card
          bg-black
          border-secondary
          text-white
        "
      >
        <div className="card-body">
          <div
            className="
              d-flex
              justify-content-between
              align-items-center
              mb-4
            "
          >
            <h5
              className="
                text-danger
                mb-0
              "
            >
              Lista de Aulas
            </h5>

            <button
              className="
                btn
                btn-outline-light
                btn-sm
              "
              onClick={() => setOrdem(ordem === "asc" ? "desc" : "asc")}
            >
              Ordenar: {ordem === "asc" ? "A → Z" : "Z → A"}
            </button>
          </div>

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

                  <th>Aula</th>

                  <th>Módulo</th>

                  <th>Descrição</th>

                  <th
                    className="
                      text-center
                    "
                  >
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {aulasPaginadas.map((a, i) => (
                  <tr key={a.id}>
                    <td className="text-danger">{inicio + i + 1}</td>

                    <td
                      className="
                          fw-semibold
                        "
                    >
                      {a.nome}
                    </td>

                    <td
                      className="
                          text-white
                          fw-semibold
                        "
                    >
                      {nomeModulo(a.modulo_id)}
                    </td>

                    <td
                      className="
                          text-danger
                        "
                      style={{
                        maxWidth: "500px",
                      }}
                    >
                      {a.descricao || "Sem descrição"}
                    </td>

                    <td
                      className="
                          text-center
                        "
                    >
                      <div
                        className="
                            d-flex
                            justify-content-center
                            gap-2
                          "
                      >
                        <a
                          href={`/modulos/${a.modulo_id}`}
                          className="
                              btn
                              btn-sm
                              btn-outline-light
                            "
                        >
                          Abrir
                        </a>

                        <button
                          className="
                              btn
                              btn-sm
                              btn-danger
                            "
                          onClick={() => abrirModal(a)}
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
              {`Página ${pagina} de ${totalPaginas || 1}`}
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

      <ModalAula
        novoNome={novoNome}
        setNovoNome={setNovoNome}
        novaDescricao={novaDescricao}
        setNovaDescricao={setNovaDescricao}
        salvarEdicao={salvarEdicao}
        abrirConfirmacao={abrirConfirmacao}
      />

      <Toast mensagem={toastMensagem} tipo={toastTipo} mostrar={mostrarToast} />
      <ModalConfirmacao
        titulo="Confirmar Exclusão"
        mensagem={`Deseja realmente excluir a aula "${aulaSelecionada?.nome}" ?`}
        onConfirmar={deletarAula}
      />
    </div>
  );
}
