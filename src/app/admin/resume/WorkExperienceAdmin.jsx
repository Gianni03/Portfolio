import { useState } from 'react';
import useWorkExperience from '../../../features/resume/hooks/useWorkExperience';
import {
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from '../../../api/workExperience.supabase';

export default function WorkExperienceAdmin() {
  const { items, loading, refetch } = useWorkExperience();
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const descriptionArray = description
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    if (editingId){
      try {
        await updateWorkExperience(editingId, {
          position,
          company,
          start_date: startDate,
          end_date: endDate,
          is_current: isCurrent,
          description: descriptionArray,
        });
        console.log('UPDATE OK');
        setPosition('');
        setCompany('');
        setStartDate('');
        setEndDate('');
        setIsCurrent(false);
        setDescription('');
        setEditingId(null);
        refetch();
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
      return;
    }

    try {
      await addWorkExperience({
        position,
        company,
        start_date: startDate,
        end_date: endDate,
        is_current: isCurrent,
        description: descriptionArray,
      });
      setPosition('');
      setCompany('');
      setStartDate('');
      setEndDate('');
      setIsCurrent(false);
      setDescription('');
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>

      {/* Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            required
            className="px-3 py-2 text-black w-full"
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            required
            className="px-3 py-2 text-black w-full"
          />

          <div className="flex gap-4">
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start date (e.g. Mar 2022)"
              required
              className="px-3 py-2 text-black w-full"
            />

            {!isCurrent && (
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
                className="px-3 py-2 text-black w-full"
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
            />
            Current position
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One bullet per line"
            rows={5}
            required
            className="px-3 py-2 text-black w-full"
          />

          
          <button className="bg-green-600 px-4 py-2 rounded">
            {saving ? 'Saving...' : 'Add experience'}
          </button>
        </form>
      </div>

      {/* List */}
      <div>
        <ul className="space-y-4">
          {items.map((exp) => (
            <li
              key={exp.id}
              className="bg-neutral-800 p-4 rounded flex justify-between"
            >
              <div>
                <p className="font-semibold">
                  {exp.role} — {exp.company}
                </p>
                <p className="text-sm text-neutral-400">
                  {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                </p>
              </div>

              <button 
                onClick={() => {
                  setEditingId(exp.id);
                  setPosition(exp.position);
                  setCompany(exp.company);
                  setStartDate(exp.start_date);
                  setEndDate(exp.end_date);
                  setIsCurrent(exp.is_current);
                  setDescription(exp.description);
                }}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  await deleteWorkExperience(exp.id);
                  refetch();
                }}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
