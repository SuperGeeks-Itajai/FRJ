import { supabase } from "../supabaseClient";

export async function criarModulo(modulo) {
  const { data, error } = await supabase
    .from("modulos")
    .insert([modulo])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function editarModulo(id, modulo) {
  const { error } = await supabase
    .from("modulos")
    .update(modulo)
    .eq("id", id);

  if (error) throw error;
}

export async function excluirModulo(id) {
  const { error } = await supabase
    .from("modulos")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function contarAulas(idModulo) {
  const { count, error } = await supabase
    .from("aulas")
    .select("*", { count: "exact", head: true })
    .eq("modulo_id", idModulo);

  if (error) throw error;

  return count;
}