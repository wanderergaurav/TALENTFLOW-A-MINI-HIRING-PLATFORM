import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as pages from "./pages";
import server from "./server";
import db from './db';

// // Initialize the mock server and the database
// db.open().catch(err => console.error("Failed to open db: " + err.stack));
server();

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