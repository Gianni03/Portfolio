import { supabase } from "../lib/supabaseClient";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

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

  if (!title) {
    throw new Error("Title is required");
  }
  if (!image) {
    throw new Error("Image is required");
  }

  // 1. Upload image
  const fileExt = image.name.split('.').pop();
  const fileName = `project-${Date.now()}.${fileExt}`;

  const { data: uploadData, error: uploadError } =
    await supabase.storage
      .from("projects")
      .upload(fileName, image, {
        cacheControl: '3600',
        contentType: image.type,
        upsert: false,
      });

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
      description: description || null,
      stack: Array.isArray(stack) ? stack : [],
      image: publicData.publicUrl,
      demo_url: demo_url || null,
      repo_url: repo_url || null,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateProject(id, {
  title,
  description,
  stack,
  image,
  demo_url,
  repo_url,
}) {
  let imageUrl;

  // 1. Subir imagen SOLO si viene una nueva
  if (image) {
    const ext = image.name.split('.').pop();
    const fileName = `project-${Date.now()}.${ext}`;

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from('projects')
        .upload(fileName, image, {
          contentType: image.type,
        });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase
      .storage
      .from('projects')
      .getPublicUrl(uploadData.path);

    imageUrl = publicData.publicUrl;
  }

  // 2. Construir updates
  const updateData = {
    title,
    description,
    stack,
    demo_url,
    repo_url,
  };

  if (imageUrl) {
    updateData.image = imageUrl;
  }

  // 3. Update en DB
  const { error } = await supabase
    .from('projects')
    .update(updateData)
    .eq('id', id);

  if (error) throw error;
}




export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}
