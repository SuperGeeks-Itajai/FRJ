export default function ModalConfirmacao({
  titulo,
  mensagem,
  onConfirmar,
  carregando,
}) {
  return (
    <div className="modal fade" id="modalConfirmacao" tabIndex="-1">
      <div className="modal-dialog">
        <div
          className="
            modal-content
            bg-black
            text-white
            border-secondary
          "
        >
          {/* HEADER */}
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-danger">{titulo}</h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              disabled={carregando}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <p className="mb-0">{mensagem}</p>
          </div>

          {/* FOOTER */}
          <div className="modal-footer border-secondary">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={carregando}
            >
              Cancelar
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirmar}
              disabled={carregando}
            >
              {carregando ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}