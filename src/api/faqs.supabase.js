import { supabase } from '../lib/supabaseClient';

export async function getFaqs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;
  return data;
}

export async function addFaq({
  question_es,
  question_en,
  answer_es,
  answer_en,
  position = 0,
  visible = true,
}) {
  if (!question_es || !question_en) {
    throw new Error('La pregunta es obligatoria en los dos idiomas.');
  }

  const { data, error } = await supabase
    .from('faqs')
    .insert({
      question_es,
      question_en,
      answer_es: answer_es || '',
      answer_en: answer_en || '',
      position,
      visible,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFaq(
  id,
  { question_es, question_en, answer_es, answer_en, position, visible },
) {
  const { error } = await supabase
    .from('faqs')
    .update({
      question_es,
      question_en,
      answer_es,
      answer_en,
      position,
      visible,
    })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteFaq(id) {
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw error;
}
