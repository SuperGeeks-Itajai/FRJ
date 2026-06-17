import { supabase } from "../supabaseClient";

// Buscar todas as aulas de um módulo
export async function buscarAulas(moduloId) {
  const { data, error } = await supabase
    .from("aulas")
    .select("*")
    .eq("modulo_id", moduloId)
    .order("id");

  if (error) throw error;

  return data || [];
}

// Criar uma nova aula
export async function criarAula(dados) {
  const { data, error } = await supabase
    .from("aulas")
    .insert([dados])
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Atualizar uma aula
export async function editarAula(id, dados) {
  const { error } = await supabase
    .from("aulas")
    .update(dados)
    .eq("id", id);

  if (error) throw error;
}

// Excluir uma aula
export async function excluirAula(id) {
  const { error } = await supabase
    .from("aulas")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// Buscar um módulo
export async function buscarModulo(id) {
  const { data, error } = await supabase
    .from("modulos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}