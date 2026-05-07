export default function FormAula({
  nome,
  setNome,
  descricao,
  setDescricao,
  adicionarAula
}) {

  return (
    <div className="card bg-black border-secondary mb-4">

      <div className="card-body">

        <h5 className="text-white mb-3">
          Nova Aula
        </h5>

        <input
          className="form-control mb-3"
          placeholder="Nome da aula"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Descrição da aula"
          value={descricao}
          onChange={(e) =>
            setDescricao(e.target.value)
          }
        />

        <button
          className="btn btn-danger"
          onClick={adicionarAula}
        >
          Adicionar Aula
        </button>

      </div>

    </div>
  )
}