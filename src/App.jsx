import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./app/layout";
import Home from "./app/index";
import Projects from "./app/projects";
import Studies from "./app/studies";
import Resume from "./app/resume";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
