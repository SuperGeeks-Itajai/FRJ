import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function TelaModulo({ modulo, voltar }) {
  const [aulas, setAulas] = useState([])
  const [pagina, setPagina] = useState(1)

  const [nome, setNome] = useState(modulo.nome)
  const [ferramentas, setFerramentas] = useState(modulo.ferramentas)

  const aulasPorPagina = 10

  useEffect(() => {
    async function fetchAulas() {
      const { data } = await supabase
        .from("aulas")
        .select("*")
        .eq("modulo_id", modulo.id)

      setAulas(data || [])
    }

    fetchAulas()
  }, [modulo.id])

  async function atualizarModulo() {
    await supabase
      .from("modulos")
      .update({ nome, ferramentas })
      .eq("id", modulo.id)

    alert("Atualizado!")
  }

  async function deletarModulo() {
    if (!confirm("Apagar módulo?")) return

    await supabase.from("modulos").delete().eq("id", modulo.id)
    voltar()
  }

  const inicio = (pagina - 1) * aulasPorPagina
  const aulasPagina = aulas.slice(inicio, inicio + aulasPorPagina)

  return (
    <div style={{ padding: 20 }}>
      <button onClick={voltar}>⬅ Voltar</button>

      <h2>{modulo.nome}</h2>

      <input value={nome} onChange={e => setNome(e.target.value)} />
      <input
        value={ferramentas}
        onChange={e => setFerramentas(e.target.value)}
      />

      <button onClick={atualizarModulo}>Salvar</button>
      <button onClick={deletarModulo}>Deletar</button>

      <h3>Aulas</h3>

      {aulasPagina.map(a => (
        <AulaItem key={a.id} aula={a} reload={() => setPagina(1)} />
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={() => setPagina(p => Math.max(p - 1, 1))}>
          ◀
        </button>
        <span> Página {pagina} </span>
        <button
          onClick={() =>
            setPagina(p =>
              inicio + aulasPorPagina < aulas.length ? p + 1 : p
            )
          }
        >
          ▶
        </button>
      </div>
    </div>
  )
}

function AulaItem({ aula, reload }) {
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState(aula.nome)
  const [descricao, setDescricao] = useState(aula.descricao || "")

  async function salvar() {
    await supabase
      .from("aulas")
      .update({ nome, descricao })
      .eq("id", aula.id)

    setEditando(false)
    reload()
  }

  async function deletar() {
    await supabase.from("aulas").delete().eq("id", aula.id)
    reload()
  }

  return (
    <div style={item}>
      {editando ? (
        <>
          <input value={nome} onChange={e => setNome(e.target.value)} />
          <input
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
          <button onClick={salvar}>💾</button>
        </>
      ) : (
        <>
          <span>{aula.nome}</span>
          <button onClick={() => setEditando(true)}>✏️</button>
          <button onClick={deletar}>❌</button>
        </>
      )}
    </div>
  )
}

const item = {
  background: "#111",
  padding: 10,
  marginBottom: 5,
  borderRadius: 5
}