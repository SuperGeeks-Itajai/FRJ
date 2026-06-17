import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import * as bootstrap from "bootstrap";

import { supabase } from "../supabaseClient";

import TabelaAulas from "../components/TabelaAulas";
import ModalAula from "../components/ModalAula";
import Toast from "../components/Toast";
import ModalConfirmacao from "../components/ModalConfirmacao";

export default function ModuloDetalhe({ busca }) {
  const { id } = useParams();

  // =========================
  // STATES
  // =========================
  const [modulo, setModulo] = useState(null);

  const [aulas, setAulas] = useState([]);

  const [aulaSelecionada, setAulaSelecionada] = useState(null);

  const [novoNome, setNovoNome] = useState("");

  const [novaDescricao, setNovaDescricao] = useState("");

  const [pagina, setPagina] = useState(1);

  // TOAST
  const [toastMensagem, setToastMensagem] = useState("");

  const [toastTipo, setToastTipo] = useState("sucesso");

  const [mostrarToast, setMostrarToast] = useState(false);

  const aulasPorPagina = 15;

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
  // CARREGAR
  // =========================
  useEffect(() => {
    async function carregar() {
      const { data: moduloData } = await supabase
        .from("modulos")
        .select("*")
        .eq("id", id)
        .single();

      const { data: aulasData } = await supabase
        .from("aulas")
        .select("*")
        .eq("modulo_id", id)
        .order("id");

      setModulo(moduloData);

      setAulas(aulasData || []);
    }

    carregar();
  }, [id]);

  // =========================
  // abrir o modal em modo "Nova Aula"
  // =========================
  function abrirNovoModal() {
    setAulaSelecionada(null);

    setNovoNome("");
    setNovaDescricao("");

    const modal = new bootstrap.Modal(document.getElementById("modalAula"));

    modal.show();
  }
  // =========================
  // salvar nova aula
  // =========================

  async function salvarNovaAula() {
    if (!novoNome.trim()) return;

    const { data } = await supabase
      .from("aulas")
      .insert([
        {
          nome: novoNome,
          descricao: novaDescricao,
          modulo_id: id,
        },
      ])
      .select();

    setAulas([...aulas, data[0]]);

    mostrarMensagem("Aula criada com sucesso!");

    fecharModal();
  }

  // =========================
  // ABRIR MODAL
  // =========================
  function abrirModal(aula) {
    setAulaSelecionada(aula);

    setNovoNome(aula.nome || "");

    setNovaDescricao(aula.descricao || "");

    const modal = new bootstrap.Modal(document.getElementById("modalAula"));

    modal.show();
  }
  // =========================
  // abrir abrirConfirmacao
  // =========================
  function abrirConfirmacao(aula) {
    setAulaSelecionada(aula);

    const modal = new bootstrap.Modal(
      document.getElementById("modalConfirmacao"),
    );

    modal.show();
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

    const atualizadas = aulas.map((a) => {
      if (a.id === aulaSelecionada.id) {
        return {
          ...a,
          nome: novoNome,
          descricao: novaDescricao,
        };
      }

      return a;
    });

    setAulas(atualizadas);

    mostrarMensagem("Aula atualizada!");

    fecharModal();
  }

  // =========================
  // EXCLUIR
  // =========================
  async function deletarAula() {
    await supabase.from("aulas").delete().eq("id", aulaSelecionada.id);

    setAulas(aulas.filter((a) => a.id !== aulaSelecionada.id));

    mostrarMensagem("Aula excluída", "erro");

    fecharModal();

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
  const aulasFiltradas = aulas.filter((a) => {
    const texto = `
        ${a.nome}
        ${a.descricao}
      `.toLowerCase();

    return texto.includes(busca.toLowerCase());
  });

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
    return <p className="text-white">Carregando...</p>;
  }

  return (
    <div className="container">
      {/* TOPO */}
      <div className="mb-4">
        <h1 className="text-danger">{modulo.nome}</h1>

        <p className="text-secondary">{modulo.ferramentas}</p>
      </div>

      {/* Botão novo modal */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-danger" onClick={abrirNovoModal}>
          + Nova Aula
        </button>
      </div>

      {/* TABELA */}
      <TabelaAulas
        aulasPaginadas={aulasPaginadas}
        pagina={pagina}
        totalPaginas={totalPaginas}
        setPagina={setPagina}
        abrirModal={abrirModal}
        abrirConfirmacao={abrirConfirmacao}
        inicio={inicio}
      />
      {/* MODAL */}
      <ModalAula
        titulo={aulaSelecionada ? "Editar Aula" : "Nova Aula"}
        novoNome={novoNome}
        setNovoNome={setNovoNome}
        novaDescricao={novaDescricao}
        setNovaDescricao={setNovaDescricao}
        acao={aulaSelecionada ? salvarEdicao : salvarNovaAula}
      />

      {/* TOAST */}
      <Toast mensagem={toastMensagem} tipo={toastTipo} mostrar={mostrarToast} />

      {/* CONFIRMAÇÃO */}
      <ModalConfirmacao
        titulo="Confirmar Exclusão"
        mensagem={`
Deseja realmente excluir:
"${aulaSelecionada?.nome}" ?
`}
        onConfirmar={deletarAula}
      />
    </div>
  );
}
