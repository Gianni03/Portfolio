import { supabase } from "../lib/supabaseClient";

export async function getStudies() {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addStudy({
  title,
  institution,
  year,
  description,
  image,
}) {
  // 1. Upload image
  const fileName = `study-${Date.now()}-${image.name}`;

  const { data: uploadData, error: uploadError } =
    await supabase.storage
      .from("studies")
      .upload(fileName, image);

  if (uploadError) throw uploadError;

  // 2. Get public URL
  const { data: publicData } = supabase
    .storage
    .from("studies")
    .getPublicUrl(uploadData.path);

  // 3. Insert into DB
  const { data, error } = await supabase
    .from("studies")
    .insert({
      title,
      institution,
      year,
      description,
      image: publicData.publicUrl,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}


export async function updateStudy(id, updates) {
  const { error } = await supabase
    .from('studies')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}

export async function deleteStudy(id) {
  const { error } = await supabase.from("studies").delete().eq("id", id);

  if (error) throw error;
}
