import { supabase } from "../lib/supabaseClient";

export async function getStudies() {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addStudy(study) {
  const { data, error } = await supabase
    .from("studies")
    .insert(study)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteStudy(id) {
  await supabase.from("studies").delete().eq("id", id);
}
