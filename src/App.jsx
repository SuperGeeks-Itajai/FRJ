import { useEffect, useState } from "react"

import { Routes, Route } from "react-router-dom"

import { supabase } from "./supabaseClient"

import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import Modulos from "./pages/Modulos"
import ModuloDetalhe from "./pages/ModuloDetalhe"

export default function App() {

  // =========================
  // STATES
  // =========================
  const [modulos, setModulos] =
    useState([])

  const [aulas, setAulas] =
    useState([])

  const [busca, setBusca] =
    useState("")

  // =========================
  // CARREGAR DADOS
  // =========================
  async function carregarDados() {

    const { data: modulosData } =
      await supabase
        .from("modulos")
        .select("*")
        .order("id")

    const { data: aulasData } =
      await supabase
        .from("aulas")
        .select("*")
        .order("id")

    setModulos(modulosData || [])
    setAulas(aulasData || [])

  }

  // =========================
  // INIT
  // =========================
  useEffect(() => {

    async function init() {

      await carregarDados()

    }

    init()

  }, [])

  // =========================
  // FILTRAR AULAS
  // =========================
  const aulasFiltradas =
    aulas.filter(aula => {

      const texto =
        `
        ${aula.nome || ""}
        ${aula.descricao || ""}
        `
          .toLowerCase()

      return texto.includes(
        busca.toLowerCase()
      )

    })

  // =========================
  // FILTRAR MÓDULOS
  // =========================
  const modulosFiltrados =
    modulos.filter(modulo => {

      // módulo aparece
      // se alguma aula dele
      // bater na busca

      const possuiAula =
        aulasFiltradas.some(
          aula =>
            aula.modulo_id === modulo.id
        )

      // OU o próprio módulo
      // bate na busca

      const textoModulo =
        `
        ${modulo.nome || ""}
        ${modulo.ferramentas || ""}
        `
          .toLowerCase()

      return (
        possuiAula ||
        textoModulo.includes(
          busca.toLowerCase()
        )
      )

    })

  return (

    <div className="bg-dark text-white min-vh-100">

      {/* NAVBAR */}
      <Navbar
        busca={busca}
        setBusca={setBusca}
      />

      {/* CONTEÚDO */}
      <div
        className="container-fluid p-4"
        style={{
          marginTop: "50px",
        }}
      >

        <Routes>

          {/* DASHBOARD */}
          <Route
            path="/"
            element={
              <Dashboard
                modulos={modulosFiltrados}
                aulas={aulasFiltradas}
              />
            }
          />

          {/* MÓDULOS */}
          <Route
            path="/modulos"
            element={
              <Modulos
                modulos={modulos}
                carregarDados={carregarDados}
              />
            }
          />

          {/* DETALHE MÓDULO */}
          <Route
            path="/modulos/:id"
            element={
              <ModuloDetalhe
                carregarDados={carregarDados}
              />
            }
          />

        </Routes>

      </div>

    </div>

  )

}