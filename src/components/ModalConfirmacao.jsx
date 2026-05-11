export default function ModalConfirmacao({

  titulo,
  mensagem,
  onConfirmar

}) {

  return (

    <div
      className="modal fade"
      id="modalConfirmacao"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="
          modal-content
          bg-black
          text-white
          border-secondary
        ">

          {/* HEADER */}
          <div className="
            modal-header
            border-secondary
          ">

            <h5 className="modal-title text-danger">

              {titulo}

            </h5>

            <button
              type="button"
              className="
                btn-close
                btn-close-white
              "
              data-bs-dismiss="modal"
            ></button>

          </div>

          {/* BODY */}
          <div className="modal-body">

            <p className="mb-0">

              {mensagem}

            </p>

          </div>

          {/* FOOTER */}
          <div className="
            modal-footer
            border-secondary
          ">

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirmar}
            >
              Excluir
            </button>

          </div>

        </div>

      </div>

    </div>

  )

}