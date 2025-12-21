import { useProfile } from "../../features/resume/hooks/useProfile";
import Profile from "../../features/resume/components/Profile";
import Skills from "../../features/resume/components/Skills";
import WorkExperience from "../../features/resume/components/WorkExperience";
import Studies from "../../features/resume/components/Studies";

export default function Resume() {

  const { loading } = useProfile();

if (loading) return 'Loading...';


  return (
    <div>
      <Profile />
      <Skills />
      <WorkExperience />
      <Studies />
    </div>
  );
}
