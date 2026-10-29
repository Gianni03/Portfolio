import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';
import Home from './app/home/Home';

// Everything except the landing page is split, so a visitor who only reads the
// home does not download the admin panel or the resume.
const Projects = lazy(() => import('./app/projects/Projects'));
const Studies = lazy(() => import('./app/studies/Studies'));
const Resume = lazy(() => import('./app/resume/Resume'));
const Login = lazy(() => import('./app/admin/Login'));
const Admin = lazy(() => import('./app/admin/Admin'));
const ProjectsAdmin = lazy(() => import('./app/admin/ProjectsAdmin'));
const StudiesAdmin = lazy(() => import('./app/admin/StudiesAdmin'));
const ResumeAdmin = lazy(() => import('./app/admin/ResumeAdmin'));
const ProfileAdmin = lazy(() => import('./app/admin/resume/ProfileAdmin'));
const WorkExperienceAdmin = lazy(
  () => import('./app/admin/resume/WorkExperienceAdmin'),
);
const ResumeStudiesAdmin = lazy(
  () => import('./app/admin/resume/StudiesAdmin'),
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className="p-8 text-neutral-500">Loading…</p>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
