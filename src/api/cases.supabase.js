import { supabase } from '../lib/supabaseClient';

const BUCKET = 'projects';

async function uploadImage(file) {
  if (!file) return null;

  const ext = file.name.split('.').pop();
  const fileName = `case-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return publicData.publicUrl;
}

export async function getCases() {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;
  return data;
}

export async function addCase({
  slug,
  title,
  rubro_es,
  rubro_en,
  problem_es,
  problem_en,
  built_es,
  built_en,
  result_es,
  result_en,
  link,
  image,
  position = 0,
  visible = true,
}) {
  if (!title || !slug) {
    throw new Error('El título y el slug son obligatorios.');
  }

  const imageUrl = await uploadImage(image);

  const { data, error } = await supabase
    .from('cases')
    .insert({
      slug,
      title,
      rubro_es,
      rubro_en,
      problem_es,
      problem_en,
      built_es,
      built_en,
      result_es,
      result_en,
      link: link || null,
      image: imageUrl,
      position,
      visible,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCase(
  id,
  {
    slug,
    title,
    rubro_es,
    rubro_en,
    problem_es,
    problem_en,
    built_es,
    built_en,
    result_es,
    result_en,
    link,
    image,
    position,
    visible,
  },
) {
  const updateData = {
    slug,
    title,
    rubro_es,
    rubro_en,
    problem_es,
    problem_en,
    built_es,
    built_en,
    result_es,
    result_en,
    link: link || null,
    position,
    visible,
  };

  const imageUrl = await uploadImage(image);
  if (imageUrl) updateData.image = imageUrl;

  const { error } = await supabase.from('cases').update(updateData).eq('id', id);
  if (error) throw error;
}

export async function deleteCase(id) {
  const { error } = await supabase.from('cases').delete().eq('id', id);
  if (error) throw error;
}
