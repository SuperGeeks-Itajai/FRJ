import { supabase } from "../supabaseClient"

export default function ModalAula({
  aula,
  nome,
  setNome,
  descricao,
  setDescricao,
  fechar,
  atualizarLista
}) {
  if (!aula) return null

  async function salvar() {
    await supabase
      .from("aulas")
      .update({ nome, descricao })
      .eq("id", aula.id)

    fechar()
    await atualizarLista()
  }

  async function deletar() {
    await supabase
      .from("aulas")
      .delete()
      .eq("id", aula.id)

    fechar()
    await atualizarLista()
  }

  return (
    <div className="modal fade" id="modalAula" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-white">

          <div className="modal-header">
            <h5 className="modal-title">Editar Aula</h5>
            <button
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-2"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <textarea
              className="form-control"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button className="btn btn-danger" onClick={deletar}>
              Excluir
            </button>

            <button className="btn btn-primary" onClick={salvar}>
              Salvar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}