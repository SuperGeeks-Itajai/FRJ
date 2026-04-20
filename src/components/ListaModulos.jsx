export default function ListaModulos({ modulos, aulas, busca, onSelect }) {
  function contarAulas(moduloId) {
    return aulas.filter(a => a.modulo_id === moduloId).length
  }

  function temBusca(moduloId) {
    if (!busca) return true

    return aulas.some(
      a =>
        a.modulo_id === moduloId &&
        a.nome.toLowerCase().includes(busca.toLowerCase())
    )
  }

  return (
    <div>
      {modulos
        .filter(m => temBusca(m.id))
        .map(m => (
          <div key={m.id} style={card} onClick={() => onSelect(m)}>
            <strong>{m.nome}</strong> | {m.ferramentas} |{" "}
            {contarAulas(m.id)} aulas
          </div>
        ))}
    </div>
  )
}

const card = {
  background: "#111",
  padding: 15,
  marginBottom: 10,
  borderRadius: 8,
  cursor: "pointer",
  border: "1px solid #ff4d4d"
}