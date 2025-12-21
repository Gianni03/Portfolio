import { supabase } from "../lib/supabaseClient";

export async function getWorkExperience() {
  const { data, error } = await supabase
    .from("work_experience")
    .select("*")
    .order('is_current', { ascending: false })
    .order('end_date', { ascending: false, nullsFirst: true })
    .order('start_date', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addWorkExperience({
  position,
  company,
  start_date,
  end_date,
  is_current,
  description,
}) {
  const { data, error } = await supabase
    .from("work_experience")
    .insert({
      position,
      company,
      start_date,
      end_date: is_current ? null : end_date,
      is_current,
      description,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateWorkExperience(id, updates) {
  const { error } = await supabase
    .from("work_experience")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteWorkExperience(id) {
  const { error } = await supabase
    .from("work_experience")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
