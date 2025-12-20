import { useEffect, useState } from 'react';
import { useProfile } from '../../../features/resume/hooks/useProfile';

export default function ProfileAdmin() {
  const { profile, loading, saving, saveProfile } = useProfile();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!profile) return;

    setForm((prev) => (prev.id === profile.id ? prev : profile));
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        name="name"
        value={form.name || ''}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        name="role"
        value={form.role || ''}
        onChange={handleChange}
        placeholder="Role"
        required
      />

      <input
        name="location"
        value={form.location || ''}
        onChange={handleChange}
        placeholder="Location"
      />

      <input
        name="email"
        type="email"
        value={form.email || ''}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        name="github"
        value={form.github || ''}
        onChange={handleChange}
        placeholder="GitHub URL"
      />

      <input
        name="linkedin"
        value={form.linkedin || ''}
        onChange={handleChange}
        placeholder="LinkedIn URL"
      />

      <input
        name="portfolio"
        value={form.portfolio || ''}
        onChange={handleChange}
        placeholder="Portfolio URL"
      />

      <textarea
        name="summary"
        value={form.summary || ''}
        onChange={handleChange}
        placeholder="Summary"
        rows={8}
        required
      />

      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save profile'}
      </button>
    </form>
  );
}
