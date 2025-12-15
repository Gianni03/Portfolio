import { supabase } from "../lib/supabaseClient";

export async function getStudies() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addProject(studie) {
  const { data, error } = await supabase
    .from("studies")
    .insert(studie)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteStudies(id) {
  await supabase.from("studies").delete().eq("id", id);
}
