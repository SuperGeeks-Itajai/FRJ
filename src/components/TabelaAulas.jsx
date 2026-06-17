export default function TabelaAulas({
  aulasPaginadas,
  pagina,
  totalPaginas,
  setPagina,
  abrirModal,
  abrirConfirmacao,
  inicio,
}) {
  return (
    <div className="card bg-black border-secondary">
      <div className="card-body">
        <h5 className="text-white mb-3">Aulas</h5>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {aulasPaginadas.map((aula, index) => (
                <tr key={aula.id}>
                  <td>{inicio + index + 1}</td>

                  <td>{aula.nome}</td>

                  <td>{aula.descricao || "Sem descrição"}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => abrirModal(aula)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => abrirConfirmacao(aula)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-light"
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            Anterior
          </button>

          <span className="text-white">
            {`Página ${pagina} de ${totalPaginas}`}
          </span>

          <button
            className="btn btn-outline-light"
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
