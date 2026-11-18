import { supabase } from '../lib/supabaseClient';

const BUCKET = 'projects';

async function uploadImage(file) {
  if (!file) return null;

  const ext = file.name.split('.').pop();
  const fileName = `logo-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return publicData.publicUrl;
}

export async function getLogos() {
  const { data, error } = await supabase
    .from('logos')
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;
  return data;
}

export async function addLogo({
  name,
  image,
  imagePath,
  href,
  position = 0,
  visible = true,
}) {
  if (!name) throw new Error('El nombre es obligatorio.');

  const uploaded = await uploadImage(image);
  const finalImage = uploaded || imagePath;

  if (!finalImage) throw new Error('Falta la imagen: subí un archivo o indicá una ruta.');

  const { data, error } = await supabase
    .from('logos')
    .insert({
      name,
      image: finalImage,
      href: href || null,
      position,
      visible,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLogo(
  id,
  { name, image, imagePath, href, position, visible },
) {
  const uploaded = await uploadImage(image);

  const updateData = {
    name,
    href: href || null,
    position,
    visible,
  };

  if (uploaded) updateData.image = uploaded;
  else if (imagePath) updateData.image = imagePath;

  const { error } = await supabase.from('logos').update(updateData).eq('id', id);
  if (error) throw error;
}

export async function deleteLogo(id) {
  const { error } = await supabase.from('logos').delete().eq('id', id);
  if (error) throw error;
}
