import { useEffect, useState } from "react";

import { supabase } from "./supabaseClient";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Modulos from "./pages/Modulos";
import ModuloDetalhe from "./pages/ModuloDetalhe";

export default function App() {

  const [modulos, setModulos] = useState([]);
  const [aulas, setAulas] = useState([]);

  const [busca, setBusca] = useState("");

  // =========================
  // CARREGAR DADOS
  // =========================
  async function carregarDados() {

    const { data: modulosData } =
      await supabase
        .from("modulos")
        .select("*")
        .order("id");

    const { data: aulasData } =
      await supabase
        .from("aulas")
        .select("*")
        .order("id");

    setModulos(modulosData || []);
    setAulas(aulasData || []);

  }

  // =========================
  // INIT
  // =========================
  useEffect(() => {

    async function init() {
      await carregarDados();
    }

    init();

  }, []);

  return (

    <div className="bg-dark text-white min-vh-100">

      <Navbar
        busca={busca}
        setBusca={setBusca}
      />

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
                modulos={modulos}
                aulas={aulas}
                busca={busca}
              />
            }
          />

          {/* MODULOS */}
          <Route
            path="/modulos"
            element={
              <Modulos
                modulos={modulos}
                busca={busca}
                carregarDados={carregarDados}
              />
            }
          />

          {/* DETALHE */}
          <Route
            path="/modulos/:id"
            element={
              <ModuloDetalhe
                busca={busca}
                carregarDados={carregarDados}
              />
            }
          />

        </Routes>

      </div>

    </div>

  );

}