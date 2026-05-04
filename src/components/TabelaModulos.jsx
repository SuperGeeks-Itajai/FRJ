export default function TabelaModulos({ modulos, aulas }) {
  function contarAulas(id) {
    return aulas.filter(a => a.modulo_id === id).length
  }

  return (
    <div className="card bg-black text-white border-secondary">
      <div className="card-body">

        <h5 className="mb-3">Módulos</h5>

        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Módulo</th>
              <th>Ferramentas</th>
              <th>Aulas</th>
            </tr>
          </thead>

          <tbody>
            {modulos.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>{m.nome}</td>
                <td>{m.ferramentas}</td>
                <td>{contarAulas(m.id)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}