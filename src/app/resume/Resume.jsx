import { useProfile } from "../../features/resume/hooks/useProfile";
import Profile from "../../features/resume/components/Profile";
import Skills from "../../features/resume/components/Skills";
import WorkExperience from "../../features/resume/components/WorkExperience";
import Studies from "../../features/resume/components/Studies";

export default function Resume() {

  const { loading } = useProfile();

if (loading) return 'Loading...';


  return (
     <main className="max-w-4xl mx-auto px-6 py-20 space-y-28">
      <Profile />
      <Skills />
      <WorkExperience />
      <Studies />
    </main>
  );
}
