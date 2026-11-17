import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './features/layout/Layout';
import Home from './app/home/Home';
import LocaleProvider from './i18n/LocaleProvider';

// Everything except the landing page is split, so a visitor who only reads the
// home does not download the admin panel or the resume.
const Projects = lazy(() => import('./app/projects/Projects'));
const Studies = lazy(() => import('./app/studies/Studies'));
const Resume = lazy(() => import('./app/resume/Resume'));
const LegacyPortfolio = lazy(
  () => import('./legacy-portfolio/LegacyPortfolio'),
);
const Login = lazy(() => import('./app/admin/Login'));
const Admin = lazy(() => import('./app/admin/Admin'));
const ProjectsAdmin = lazy(() => import('./app/admin/ProjectsAdmin'));
const FaqsAdmin = lazy(() => import('./app/admin/FaqsAdmin'));
const CasesAdmin = lazy(() => import('./app/admin/CasesAdmin'));
const CaseRoute = lazy(() => import('./app/case/CaseRoute'));
const RosarioPage = lazy(() => import('./seo/pages/rosario'));
const StudiesAdmin = lazy(() => import('./app/admin/StudiesAdmin'));
const ResumeAdmin = lazy(() => import('./app/admin/ResumeAdmin'));
const ProfileAdmin = lazy(() => import('./app/admin/resume/ProfileAdmin'));
const WorkExperienceAdmin = lazy(
  () => import('./app/admin/resume/WorkExperienceAdmin'),
);
const ResumeStudiesAdmin = lazy(
  () => import('./app/admin/resume/StudiesAdmin'),
);

function useLocale() {
  const { pathname } = useLocation();
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

function AppRoutes() {
  const locale = useLocale();

  return (
    <LocaleProvider locale={locale}>
      <Suspense fallback={<p className="p-8 text-neutral-500">Loading…</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/portfolio" element={<LegacyPortfolio />} />
            <Route path="/en" element={<Home />} />
            <Route path="/en/projects" element={<Projects />} />
            <Route path="/en/studies" element={<Studies />} />
            <Route path="/en/resume" element={<Resume />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/casos/:slug" element={<CaseRoute />} />
          <Route path="/desarrollo-web-rosario" element={<RosarioPage />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="studies" element={<StudiesAdmin />} />
            <Route path="faqs" element={<FaqsAdmin />} />
            <Route path="cases" element={<CasesAdmin />} />
            <Route path="resume" element={<ResumeAdmin />}>
              <Route path="profile" element={<ProfileAdmin />} />
              <Route path="work-experience" element={<WorkExperienceAdmin />} />
              <Route path="studies" element={<ResumeStudiesAdmin />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </LocaleProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
