export default function CardAula({ aula, onClick }) {
  return (
    <div
      className="card bg-dark text-white border-light mx-auto mt-4"
      style={{ maxWidth: 400 }}
    >
      <div className="card-body">
        <h5 className="card-title">{aula.nome}</h5>

        <p className="card-text">
          {aula.descricao || "Sem descrição"}
        </p>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalAula"
          onClick={() => onClick(aula)}
        >
          Editar Aula
        </button>
      </div>
    </div>
  )
}