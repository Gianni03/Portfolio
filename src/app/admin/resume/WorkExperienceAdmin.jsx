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

    if (editingId) {
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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-white">Work Experience</h2>
        <button
          onClick={() => {
            setPosition('');
            setCompany('');
            setStartDate('');
            setEndDate('');
            setIsCurrent(false);
            setDescription('');
            setEditingId(null);
          }}
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
        >
          Reset Form
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-12 bg-neutral-900/30 p-6 rounded-xl border border-neutral-800/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Job Position
              </label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                Company
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name"
                required
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                  Start Date
                </label>
                <input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Mar 2022"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                />
              </div>
              {!isCurrent && (
                <div className="flex-1">
                  <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
                    End Date
                  </label>
                  <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Dec 2023"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center gap-3 text-sm text-neutral-300 cursor-pointer group select-none">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    isCurrent
                      ? 'bg-amber-500 border-amber-500'
                      : 'bg-neutral-950 border-neutral-700 group-hover:border-neutral-500'
                  }`}
                >
                  {isCurrent && (
                    <svg
                      className="w-3.5 h-3.5 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="hidden"
                />
                <span>Currently working here</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Description (Bullet points)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="• Implemented new features..."
              rows={10}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all resize-none leading-relaxed"
            />
            <p className="text-[10px] text-neutral-600 mt-2 text-right">
              Separate items with new lines
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-800">
          <button
            className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50"
            disabled={saving}
          >
            {saving
              ? 'Saving...'
              : editingId
              ? 'Update Experience'
              : 'Add Experience'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-3">
        {items.map((exp) => (
          <div
            key={exp.id}
            className="group bg-neutral-900/30 border border-neutral-800/50 p-6 rounded-xl flex items-center justify-between hover:bg-neutral-900/50 transition-all"
          >
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="text-lg font-medium text-white">{exp.role}</h3>
                <span className="text-neutral-500 text-sm">at</span>
                <h4 className="text-lg text-amber-500/90">{exp.company}</h4>
              </div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-medium mb-3">
                {exp.start_date} –{' '}
                {exp.is_current ? (
                  <span className="text-green-400">Present</span>
                ) : (
                  exp.end_date
                )}
              </p>

              <ul className="list-disc list-inside text-sm text-neutral-400 space-y-1 pl-1 border-l-2 border-neutral-800 ml-1">
                {/* Only show first 2 items in preview */}
                {Array.isArray(exp.description)
                  ? exp.description.slice(0, 2).map((d, i) => (
                      <li key={i} className="line-clamp-1">
                        {d}
                      </li>
                    ))
                  : null}
                {Array.isArray(exp.description) &&
                  exp.description.length > 2 && (
                    <li className="list-none text-xs text-neutral-600 pl-4 py-1">
                      +{exp.description.length - 2} more items...
                    </li>
                  )}
              </ul>
            </div>

            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-6">
              <button
                onClick={() => {
                  setEditingId(exp.id);
                  setPosition(exp.position);
                  setCompany(exp.company);
                  setStartDate(exp.start_date);
                  setEndDate(exp.end_date);
                  setIsCurrent(exp.is_current);
                  setDescription(
                    Array.isArray(exp.description)
                      ? exp.description.join('\n')
                      : exp.description
                  );
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (
                    !confirm('Are you sure you want to delete this experience?')
                  )
                    return;
                  await deleteWorkExperience(exp.id);
                  refetch();
                }}
                className="px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-400 bg-red-950/20 hover:bg-red-950/40 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-neutral-600 text-sm">
            No work experience entries found.
          </div>
        )}
      </div>
    </div>
  );
}
