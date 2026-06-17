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
          <table className="table table-dark table-striped table-hover align-middle">
            <thead>
              <tr>
                <th style={{ width: "70px" }}>#</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th className="text-center" style={{ width: "140px" }}>
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {aulasPaginadas.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-secondary py-4">
                    Nenhuma aula encontrada.
                  </td>
                </tr>
              ) : (
                aulasPaginadas.map((aula, index) => (
                  <tr key={aula.id}>
                    <td className="text-center">{inicio + index + 1}</td>

                    <td>{aula.nome}</td>

                    <td style={{ maxWidth: "350px" }}>
                      <span
                        className="d-inline-block text-truncate"
                        style={{ maxWidth: "330px" }}
                        title={aula.descricao}
                      >
                        {aula.descricao || "Sem descrição"}
                      </span>
                    </td>

                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-warning"
                          title="Editar aula"
                          onClick={() => abrirModal(aula)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Excluir aula"
                          onClick={() => abrirConfirmacao(aula)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
            Página {pagina} de {totalPaginas || 1}
          </span>

          <button
            className="btn btn-outline-light"
            disabled={pagina === totalPaginas || totalPaginas === 0}
            onClick={() => setPagina(pagina + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
