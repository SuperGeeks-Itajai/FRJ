export default function ModalAula({
  novoNome,
  setNovoNome,
  novaDescricao,
  setNovaDescricao,
  salvarEdicao,
}) {
  return (
    <div
      className="modal fade"
      id="modalAula"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-black text-white">
          <div className="modal-header">
            <h5 className="modal-title">
              Editar Aula
            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-3"
              value={novoNome}
              onChange={(e) =>
                setNovoNome(
                  e.target.value
                )
              }
            />

            <textarea
              className="form-control"
              rows="4"
              value={novaDescricao}
              onChange={(e) =>
                setNovaDescricao(
                  e.target.value
                )
              }
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              className="btn btn-success"
              onClick={salvarEdicao}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}