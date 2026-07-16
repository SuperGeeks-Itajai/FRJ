import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import * as bootstrap from "bootstrap";

import {
  buscarModulo,
  buscarAulas,
  criarAula,
  editarAula,
  excluirAula,
} from "../services/AulasService";

import TabelaAulas from "../components/TabelaAulas";
import ModalAula from "../components/ModalAula";
import Toast from "../components/Toast";
import ModalConfirmacao from "../components/ModalConfirmacao";
import useToast from "../hooks/useToast";

export default function ModuloDetalhe({ busca }) {
  const { id } = useParams();

  // =========================
  // STATES
  // =========================
  const [carregando, setCarregando] = useState(false);

  const [excluindo, setExcluindo] = useState(false);

  const [modulo, setModulo] = useState(null);

  const [aulas, setAulas] = useState([]);

  const [aulaSelecionada, setAulaSelecionada] = useState(null);

  const [novoNome, setNovoNome] = useState("");

  const [novaDescricao, setNovaDescricao] = useState("");

  const [pagina, setPagina] = useState(1);

  const aulasPorPagina = 15;

  // =========================
  // TOAST
  // =========================
  const { toastMensagem, toastTipo, mostrarToast, mostrarMensagem } =
    useToast();

  // =========================
  // CARREGAR
  // =========================
  useEffect(() => {
    async function carregar() {
      try {
        const moduloData = await buscarModulo(id);
        const aulasData = await buscarAulas(id);

        setModulo(moduloData);
        setAulas(aulasData || []);
      } catch (error) {
        console.error(error);
        mostrarMensagem(error.message || "Erro ao carregar módulo.", "erro");
      }
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

    setCarregando(true);

    try {
      const aula = await criarAula({
        nome: novoNome,
        descricao: novaDescricao,
        modulo_id: id,
      });

      setAulas([...aulas, aula]);

      mostrarMensagem("Aula criada com sucesso!");

      fecharModal();
    } catch (error) {
      console.error(error);
      mostrarMensagem(error.message || "Erro ao criar aula.", "erro");
    } finally {
      setCarregando(false);
    }
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
    try {
      await editarAula(aulaSelecionada.id, {
        nome: novoNome,
        descricao: novaDescricao,
      });

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
    } catch (error) {
      console.error(error);
      mostrarMensagem(error.message || "Erro ao atualizar aula.", "erro");
    }
  }

  // =========================
  // EXCLUIR
  // =========================
  async function deletarAula() {
    setExcluindo(true);
    try {
      await excluirAula(aulaSelecionada.id);

      setAulas(aulas.filter((a) => a.id !== aulaSelecionada.id));

      mostrarMensagem("Aula excluída!");

      fecharModal();

      const modalConfirmacao = bootstrap.Modal.getInstance(
        document.getElementById("modalConfirmacao"),
      );

      modalConfirmacao.hide();

      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());

      document.body.classList.remove("modal-open");

      document.body.style = "";
    } catch (error) {
      console.error(error);

      mostrarMensagem(error.message || "Erro ao excluir aula.", "erro");
    } finally {
      setExcluindo(false);
    }
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
        carregando={carregando}
        excluindo={excluindo}
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
        carregando={carregando}
      />
    </div>
  );
}
