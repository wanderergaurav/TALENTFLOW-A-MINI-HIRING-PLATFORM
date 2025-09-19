import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CandidateDescription = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await axios.get(`/api/candidates/${id}`);
        setCandidate(res.data.candidate);
      } catch (err) {
        console.error("Error fetching candidate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!candidate) return <div>Candidate not found</div>;

  return (
    <div>
      <h2>{candidate.name}</h2>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Address:</strong> {candidate.address}</p>
      <p><strong>Experience:</strong> {candidate.experience}</p>
      <p><strong>Skills:</strong> {candidate.skills.join(", ")}</p>
      <p><strong>Applied Jobs:</strong> {candidate.appliedJobs.join(", ")}</p>
    </div>
  );
};

export default CandidateDescription;
