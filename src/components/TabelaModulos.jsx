export default function TabelaModulos({

  modulos,
  aulas,

  pagina,
  setPagina

}) {

  const modulosPorPagina = 10;

  // =========================
  // CONTAR AULAS
  // =========================
  function contarAulas(id) {

    return aulas.filter(
      a => a.modulo_id === id
    ).length;

  }

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio =
    (pagina - 1)
    * modulosPorPagina;

  const fim =
    inicio + modulosPorPagina;

  const modulosPaginados =
    modulos.slice(inicio, fim);

  const totalPaginas =
    Math.ceil(
      modulos.length /
      modulosPorPagina
    );

  return (

    <div
      className="
        card
        bg-black
        text-white
        border-secondary
      "
    >

      <div className="card-body">

        <h5 className="mb-3">
          Módulos
        </h5>

        <div className="table-responsive">

          <table
            className="
              table
              table-dark
              table-hover
              align-middle
            "
          >

            <thead>

              <tr>

                <th>#</th>

                <th>Módulo</th>

                <th>Ferramentas</th>

                <th>Aulas</th>

              </tr>

            </thead>

            <tbody>

              {modulosPaginados.map((m, i) => (

                <tr key={m.id}>

                  <td>

                    <span
                      className="
                        badge
                        bg-dark
                      "
                    >
                      {inicio + i + 1}
                    </span>

                  </td>

                  <td
                    className="
                      text-danger
                      fw-semibold
                    "
                  >
                    {m.nome}
                  </td>

                  <td>
                    {m.ferramentas || "—"}
                  </td>

                  <td>
                    {contarAulas(m.id)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* PAGINAÇÃO */}
        <div
          className="
            d-flex
            justify-content-between
            align-items-center
            mt-3
          "
        >

          <p
            className="
              text-white
              mb-0
            "
          >
            Página {pagina}
            de {totalPaginas}
          </p>

          <div
            className="
              d-flex
              gap-2
            "
          >

            <button
              className="
                btn
                btn-outline-light
                btn-sm
              "
              disabled={pagina === 1}
              onClick={() =>
                setPagina(pagina - 1)
              }
            >
              Anterior
            </button>

            <button
              className="
                btn
                btn-outline-light
                btn-sm
              "
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

    </div>

  );

}