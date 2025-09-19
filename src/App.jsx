import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as pages from "./pages";


function App() {
  const {
    Home,
    Jobs,
    Assessments,
    Candidates,
    JobDescription,
    CandidateDescription
  } = pages;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDescription />} />
        <Route path="/assessments" element={<Assessments />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates/:id" element={<CandidateDescription />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;