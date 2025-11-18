import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./features/layout/Layout";
import Main from "./app/Main";
import Projects from "./app/projects/Projects";
import Studies from "./app/studies/Studies";
import Resume from "./app/resume/Resume";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/" element={<Main />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
