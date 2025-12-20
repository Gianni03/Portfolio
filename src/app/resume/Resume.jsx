import { useProfile } from "../../features/resume/hooks/useProfile";

export default function Resume() {

  const { profile, loading } = useProfile();

if (loading) return 'Loading...';

console.log(profile);

  return (
    <div>
      <h1>Mi CV</h1>
      {/* componentes del resume  */}
      {/* <Profile /> */}
      {/* <Skills /> */}
      {/* <WorkExperiences /> */}
      {/* <Studies /> */}
    </div>
  );
}
