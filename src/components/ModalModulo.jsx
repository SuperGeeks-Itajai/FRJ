export default function ModalModulo({

  novoNome,
  setNovoNome,

  novasFerramentas,
  setNovasFerramentas,

  salvarEdicao,
  deletarModulo

}) {

  return (

    <div
      className="modal fade"
      id="modalModulo"
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

            <h5 className="
              modal-title
              text-danger
            ">

              Editar Módulo

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

            <input
              className="form-control mb-3"
              placeholder="Nome do módulo"
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
              placeholder="Ferramentas"
              value={novasFerramentas}
              onChange={(e) =>
                setNovasFerramentas(
                  e.target.value
                )
              }
            />

          </div>

          {/* FOOTER */}
          <div className="
            modal-footer
            border-secondary
          ">

            <button
              className="btn btn-danger"
              onClick={deletarModulo}
            >
              Excluir
            </button>

            <button
              className="btn btn-light"
              onClick={salvarEdicao}
            >
              Salvar
            </button>

          </div>

        </div>

      </div>

    </div>

  )

}