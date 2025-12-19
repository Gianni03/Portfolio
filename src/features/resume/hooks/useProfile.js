import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../api/profile.supabase';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function saveProfile(updates) {
    try {
      setSaving(true);
      const updated = await updateProfile(profile.id, updates);
      setProfile(updated);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setSaving(false);
    }
  }

  return {
    profile,
    loading,
    saving,
    error,
    saveProfile,
  };
}
