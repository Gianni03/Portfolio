import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';
import Home from './app/home/Home';
import Projects from './app/projects/Projects';
import Studies from './app/studies/Studies';
import Resume from './app/resume/Resume';
import Admin from './app/admin/Admin';
import ProjectsAdmin from './app/admin/ProjectsAdmin';
import StudiesAdmin from './app/admin/StudiesAdmin';
import Login from './app/admin/Login';
import ResumeAdmin from './app/admin/ResumeAdmin';
import ProfileAdmin from './app/admin/resume/ProfileAdmin';
import WorkExperienceAdmin from './app/admin/resume/WorkExperienceAdmin';
import ResumeStudiesAdmin from './app/admin/resume/StudiesAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="studies" element={<StudiesAdmin />} />
          <Route path="resume" element={<ResumeAdmin />}>
            <Route path="profile" element={<ProfileAdmin />} />
            <Route path="work-experience" element={<WorkExperienceAdmin />} />
            <Route path="studies" element={<ResumeStudiesAdmin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
