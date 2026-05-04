export default function TabelaModulos({ modulos, aulas }) {
  function contarAulas(id) {
    return aulas.filter(a => a.modulo_id === id).length
  }

  return (
    <table className="table table-dark table-hover mt-4">
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
            <th>{i + 1}</th>
            <td>{m.nome}</td>
            <td>{m.ferramentas}</td>
            <td>{contarAulas(m.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}