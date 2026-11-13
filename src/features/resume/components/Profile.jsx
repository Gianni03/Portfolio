import { useProfile } from '../hooks/useProfile';

export default function Profile() {
  const { profile, loading } = useProfile();

  if (loading) return 'Loading...';

  return (
    <section className="space-y-10">

      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">
          {profile.name}
          {profile.role ? ` — ${profile.role}` : ''}
        </h1>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          <li>{profile.email}</li>
          <li>{profile.location}</li>
          <li>
            <a href={profile.linkedin} className="hover:text-white">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} className="hover:text-white">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.portfolio} className="hover:text-white">
              Website
            </a>
          </li>
        </ul>

        <a
          href="/cv/gianni-pasquinelli-cv.pdf"
          download="Gianni-Pasquinelli-CV.pdf"
          className="inline-block rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition-colors hover:border-[#7a43c1] hover:text-[#FF9FFC]"
        >
          Download CV
        </a>

      <h2 className="text-3xl font-bold">Profile</h2>
        <p className="max-w-2xl text-neutral-300 leading-relaxed whitespace-pre-line">
          {profile.summary}
        </p>
      </div>
    </section>
  );
}
