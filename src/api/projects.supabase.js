import { supabase } from "../lib/supabaseClient";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addProject({
  title,
  description,
  stack,
  image,
  demo_url,
  repo_url,
}) {
  // 1. Upload image
  const fileName = `project-${Date.now()}-${image.name}`;

  const { data: uploadData, error: uploadError } =
    await supabase.storage
      .from("projects")
      .upload(fileName, image);

  if (uploadError) throw uploadError;

  // 2. Get public URL
  const { data: publicData } = supabase
    .storage
    .from("projects")
    .getPublicUrl(uploadData.path);

  // 3. Insert project
  const { data, error } = await supabase
    .from("projects")
    .insert({
      title,
      description,
      stack,
      image: publicData.publicUrl,
      demo_url,
      repo_url,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProject(id, updates) {
  const { error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
}



export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
