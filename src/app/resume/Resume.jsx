import { useProfile } from "../../features/resume/hooks/useProfile";
import Profile from "../../features/resume/components/Profile";
import Skills from "../../features/resume/components/Skills";
import WorkExperience from "../../features/resume/components/WorkExperience";
import Studies from "../../features/resume/components/Studies";

export default function Resume() {

  const { profile, loading } = useProfile();

if (loading) return 'Loading...';

console.log(profile);

  return (
    <div>
      <h1>Mi CV</h1>
      {/* componentes del resume  */}
      <Profile />
      <Skills />
      <WorkExperience />
      <Studies />
    </div>
  );
}
