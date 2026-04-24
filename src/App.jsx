import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import ListaModulos from "./pages/ListaModulos"
import TelaModulo from "./pages/TelaModulo"

export default function App() {
  const [modulos, setModulos] = useState([])
  const [aulas, setAulas] = useState([])
  const [busca, setBusca] = useState("")
  const [moduloSelecionado, setModuloSelecionado] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const { data: modulosData } = await supabase.from("modulos").select("*")
      const { data: aulasData } = await supabase.from("aulas").select("*")

      setModulos(modulosData || [])
      setAulas(aulasData || [])
    }

    fetchData()
  }, [])

  if (moduloSelecionado) {
    return (
      <TelaModulo
        modulo={moduloSelecionado}
        voltar={() => setModuloSelecionado(null)}
      />
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Aulas</h1>

      <input
        style={styles.input}
        placeholder="Pesquisar aula..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
      />

      <ListaModulos
        modulos={modulos}
        aulas={aulas}
        busca={busca}
        onSelect={setModuloSelecionado}
      />
    </div>
  )
}

const styles = {
  container: {
    background: "linear-gradient(180deg, #000, #400000)",
    minHeight: "100vh",
    color: "white",
    padding: 20
  },
  title: {
    color: "#ff4d4d"
  },
  input: {
    padding: 10,
    width: "100%",
    marginBottom: 20,
    borderRadius: 5,
    border: "none"
  }
}