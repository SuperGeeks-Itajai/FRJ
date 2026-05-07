export default function FormModulo({

  nome,
  setNome,

  ferramentas,
  setFerramentas,

  adicionarModulo

}) {

  return (

    <div className="card bg-black border-secondary mb-4">

      <div className="card-body">

        <h5 className="text-white mb-3">
          Novo Módulo
        </h5>

        {/* NOME */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nome do módulo"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        {/* FERRAMENTAS */}
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Ferramentas utilizadas"
          value={ferramentas}
          onChange={(e) =>
            setFerramentas(e.target.value)
          }
        />

        {/* BOTÃO */}
        <button
          className="btn btn-danger"
          onClick={adicionarModulo}
        >
          Adicionar Módulo
        </button>

      </div>

    </div>

  )

}