import { supabase } from "../lib/supabaseClient";

export async function getProfile() {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .single();

    if (error) {
      throw error;
    }

    return data;
}

export async function updateProfile(id, updates) {
  const { data, error } = await supabase
    .from("profile")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

    if (error) {
      throw error;
    }

    return data;
}