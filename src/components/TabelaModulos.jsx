import { Link } from "react-router-dom"

export default function TabelaModulos({
  modulos,
  aulas,
  pagina,
  setPagina,
  totalPaginas,
  inicio
}) {

  function contarAulas(id) {

    return aulas.filter(
      a => a.modulo_id === id
    ).length

  }

  return (

    <div className="card bg-black text-white border-secondary">

      <div className="card-body">

        <h5 className="mb-3 text-white">
          Módulos
        </h5>

        <div className="table-responsive">

          <table className="table table-dark table-hover align-middle">

            <thead>

              <tr>

                <th>#</th>

                <th>Módulo</th>

                <th>Ferramentas</th>

                <th>Aulas</th>

                <th width="120">
                  Ações
                </th>

              </tr>

            </thead>

            <tbody>

              {modulos.map((m, i) => (

                <tr key={m.id}>

                  <td>
                    {inicio + i + 1}
                  </td>

                  <td className="text-danger fw-bold">
                    {m.nome}
                  </td>

                  <td>
                    {m.ferramentas}
                  </td>

                  <td>
                    {contarAulas(m.id)}
                  </td>

                  <td>

                    <Link
                      to={`/modulos/${m.id}`}
                      className="btn btn-danger btn-sm"
                    >
                      Abrir
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* PAGINAÇÃO */}
        <div className="d-flex justify-content-between align-items-center mt-4">

          <button
            className="btn btn-outline-light"
            disabled={pagina === 1}
            onClick={() =>
              setPagina(pagina - 1)
            }
          >
            Anterior
          </button>

          <span className="text-white">

            Página {pagina} de {totalPaginas}

          </span>

          <button
            className="btn btn-outline-light"
            disabled={
              pagina === totalPaginas
            }
            onClick={() =>
              setPagina(pagina + 1)
            }
          >
            Próxima
          </button>

        </div>

      </div>

    </div>

  )
}