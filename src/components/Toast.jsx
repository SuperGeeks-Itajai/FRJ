export default function Toast({

  mensagem,
  tipo,
  mostrar

}) {

  if (!mostrar) return null

  function corToast() {

    if (tipo === "erro")
      return "bg-danger"

    if (tipo === "sucesso")
      return "bg-success"

    return "bg-dark"

  }

  return (

    <div
      className="
        position-fixed
        bottom-0
        end-0
        p-4
      "
      style={{
        zIndex: 9999
      }}
    >

      <div
        className={`
          toast show
          text-white
          border-0
          ${corToast()}
        `}
      >

        <div className="d-flex">

          <div className="toast-body">

            {mensagem}

          </div>

        </div>

      </div>

    </div>

  )

}