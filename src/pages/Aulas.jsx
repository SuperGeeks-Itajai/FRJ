import { useState } from "react";

export default function Aulas({ aulas, modulos, busca }) {
  const [pagina, setPagina] = useState(1);

  const aulasPorPagina = 20;

  // =========================
  // FILTRO
  // =========================
  const aulasFiltradas = aulas.filter((a) => {
    const texto = `
        ${a.nome}
        ${a.descricao}
      `.toLowerCase();

    return texto.includes(busca.toLowerCase());
  });

  // =========================
  // PAGINAÇÃO
  // =========================
  const inicio = (pagina - 1) * aulasPorPagina;

  const fim = inicio + aulasPorPagina;

  const aulasPaginadas = aulasFiltradas.slice(inicio, fim);

  const totalPaginas = Math.ceil(aulasFiltradas.length / aulasPorPagina);

  function nomeModulo(id) {
    const modulo = modulos.find((m) => m.id === id);

    return modulo?.nome || "-";
  }

  return (
    <div className="container">
      <h1
        className="
          text-danger
          mb-4
        "
      >
        Todas as Aulas
      </h1>

      <div
        className="
          card
          bg-black
          border-secondary
          text-white
        "
      >
        <div className="card-body">
          <table
            className="
              table
              table-dark
              table-hover
            "
          >
            <thead>
              <tr>
                <th>#</th>

                <th>Aula</th>

                <th>Módulo</th>
              </tr>
            </thead>

            <tbody>
              {aulasPaginadas.map((a, i) => (
                <tr key={a.id}>
                  <td>{inicio + i + 1}</td>

                  <td>{a.nome}</td>

                  <td
                    className="
                        text-danger
                      "
                  >
                    {nomeModulo(a.modulo_id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="
              d-flex
              justify-content-between
              mt-3
            "
          >
            <span>{`Página ${pagina} de ${totalPaginas}`}</span>

            <div>
              <button
                className="
                  btn
                  btn-outline-light
                  btn-sm
                  me-2
                "
                disabled={pagina === 1}
                onClick={() => setPagina(pagina - 1)}
              >
                Anterior
              </button>

              <button
                className="
                  btn
                  btn-outline-light
                  btn-sm
                "
                disabled={pagina === totalPaginas}
                onClick={() => setPagina(pagina + 1)}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
