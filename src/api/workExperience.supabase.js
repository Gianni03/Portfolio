import { supabase } from "../lib/supabaseClient";

export async function getWorkExperience() {
  const { data, error } = await supabase
    .from("work_experience")
    .select("*")
    .select("*");

    if (error) throw error;

    // Custom sorting logic for "MM/YYYY" date strings
    data.sort((a, b) => {
      // 1. Current positions first
      if (a.is_current && !b.is_current) return -1;
      if (!a.is_current && b.is_current) return 1;

      // Helper to parse "MM/YYYY" -> YYYYMM (number)
      const parseDate = (d) => {
        if (!d) return 0;
        const [month, year] = d.split('/');
        return (parseInt(year) || 0) * 100 + (parseInt(month) || 0);
      };

      // 2. Sort by end_date descending
      const endA = parseDate(a.end_date);
      const endB = parseDate(b.end_date);
      if (endA !== endB) return endB - endA;

      // 3. Sort by start_date descending (fallback)
      const startA = parseDate(a.start_date);
    const startB = parseDate(b.start_date);
    return startB - startA;
  });

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
