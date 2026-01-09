import { useEffect, useState } from 'react';
import { useProfile } from '../../../features/resume/hooks/useProfile';

export default function ProfileAdmin() {
  const { profile, loading, saving, saveProfile } = useProfile();
  const [form, setForm] = useState({
    name: '',
    role: '',
    location: '',
    email: '',
    github: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  });

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  if (loading || !form) return <p>Loading profile...</p>;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await saveProfile(form);
    alert('Profile updated');
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-light text-white">Profile Settings</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900/30 p-8 rounded-xl border border-neutral-800/50 shadow-xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Personal Info
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Full Name
            </label>
            <input
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Professional Role
            </label>
            <input
              name="role"
              value={form.role || ''}
              onChange={handleChange}
              placeholder="Frontend Developer"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Location
            </label>
            <input
              name="location"
              value={form.location || ''}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email || ''}
              onChange={handleChange}
              placeholder="email@example.com"
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Links & Socials
            </h3>
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              GitHub URL
            </label>
            <input
              name="github"
              value={form.github || ''}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              LinkedIn URL
            </label>
            <input
              name="linkedin"
              value={form.linkedin || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Portfolio URL
            </label>
            <input
              name="portfolio"
              value={form.portfolio || ''}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all"
            />
          </div>

          <div className="col-span-1 md:col-span-2 mt-4">
            <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4 border-b border-neutral-800 pb-2">
              Bio
            </h3>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs uppercase text-neutral-500 mb-1 ml-1">
              Professional Summary
            </label>
            <textarea
              name="summary"
              value={form.summary || ''}
              onChange={handleChange}
              placeholder="Brief professional summary..."
              rows={6}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white placeholder-neutral-700 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-800">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-2.5 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
          >
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
