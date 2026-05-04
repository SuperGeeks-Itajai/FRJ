import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import Dashboard from "./components/Dashboard"
import Navbar from "./components/navbar"

export default function App() {
  const [modulos, setModulos] = useState([])
  const [aulas, setAulas] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data: mod } = await supabase.from("modulos").select("*")
      const { data: aulasData } = await supabase.from("aulas").select("*")

      setModulos(mod || [])
      setAulas(aulasData || [])
    }

    fetchData()
  }, [])

  return (
<div className="d-flex bg-dark text-white">
      <Navbar />

      <div
        className="flex-grow-1 p-4 bg-dark text-white"
         style={{ minHeight: "100vh", marginTop: "50px"}} 
      >
        <Dashboard modulos={modulos} aulas={aulas} />
      </div>
    </div>
  )
}