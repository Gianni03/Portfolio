import { supabase } from "../lib/supabaseClient";

export async function getStudies() {
  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .order('year', { ascending: false });

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
  // 1. Validaciones mínimas
  if (!title || !institution) {
    throw new Error("Title and institution are required");
  }

  let image_url = null;

  // 2. Upload image (solo si existe)
  if (image) {
    const fileName = `study-${Date.now()}-${image.name}`;

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("studies")
        .upload(fileName, image);

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase
      .storage
      .from("studies")
      .getPublicUrl(uploadData.path);

    image_url = publicData.publicUrl;
  }

  // 3. Insert DB
  const { data, error } = await supabase
    .from("studies")
    .insert({
      title,
      institution,
      year: year || null,
      description: description || null,
      image: image_url,
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
