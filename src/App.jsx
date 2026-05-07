import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import { supabase } from "./supabaseClient"

import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Modulos from "./pages/Modulos"
import ModuloDetalhe from "./pages/ModuloDetalhe"

export default function App() {

  const [modulos, setModulos] = useState([])
  const [aulas, setAulas] = useState([])

  useEffect(() => {

    async function carregarDados() {

      const { data: modulosData } =
        await supabase
          .from("modulos")
          .select("*")

      const { data: aulasData } =
        await supabase
          .from("aulas")
          .select("*")

      setModulos(modulosData || [])
      setAulas(aulasData || [])

    }

    carregarDados()

  }, [])

  return (
    <>
      <Navbar />

      <div
        className="container-fluid bg-dark text-white"
        style={{
          minHeight: "100vh",
          paddingTop: "80px"
        }}
      >

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                modulos={modulos}
                aulas={aulas}
              />
            }
          />

          <Route
            path="/modulos"
            element={<Modulos />}
          />

          <Route
            path="/modulos/:id"
            element={<ModuloDetalhe />}
          />

        </Routes>

      </div>
    </>
  )
}