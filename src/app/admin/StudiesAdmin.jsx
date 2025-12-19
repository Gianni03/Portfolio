import { useState } from 'react';
import useStudies from '../../features/studies/hooks/useStudies';
import { addStudy, deleteStudy, updateStudy } from '../../api/studies.supabase';

export default function StudiesAdmin() {
  const { studies, loading, refetch } = useStudies();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (editingId) {
      try {
        await updateStudy(editingId, {
          title,
          description,
          image,
          institution,
          year,
        });
        console.log('UPDATE OK');
        setTitle('');
        setDescription('');
        setImage(null);
        setInstitution('');
        setYear('');
        setEditingId(null);
        refetch();
      } catch (error) {
        console.log('UPDATE ERROR', error);
        setError(error.message);
      } finally {
        setSaving(false);
      }
      return;
    }
    try {
      const result = await addStudy({
        title,
        description,
        image,
        institution,
        year,
      });
      console.log('INSERT OK', result);

      setTitle('');
      setDescription('');
      setImage(null);
      setInstitution('');
      setYear('');
      refetch();
    } catch (error) {
      console.log('INSERT ERROR', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Studies</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Study title"
          className="px-3 py-1 text-black"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Study description"
          className="px-3 py-1 text-black"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          placeholder="Study image"
          className="px-3 py-1 text-black"
        />
        <input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="Study institution"
          className="px-3 py-1 text-black"
        />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Study year"
          className="px-3 py-1 text-black"
        />
        <button className="bg-green-600 px-3 py-1 rounded">Add</button>
      </form>


      <ul className="space-y-4">
        {studies.map((s) => (
          <li
            key={s.id}
            className="bg-neutral-800 p-4 rounded flex justify-between"
          >
            <span>{s.title}</span>

            <div className="flex gap-3">
              <button 
              onClick={() => {
                setEditingId(s.id);
                setTitle(s.title);
                setDescription(s.description);
                setImage(s.image);
                setInstitution(s.institution);
                setYear(s.year);
              }}
              className="bg-blue-600 px-2 py-1 rounded">Edit</button>
              <button 
              onClick={() => {
                if (!confirm('¿Eliminar esta experiencia?')) return;
                deleteStudy(s.id);
                refetch();
              }}
              className="bg-red-600 px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
