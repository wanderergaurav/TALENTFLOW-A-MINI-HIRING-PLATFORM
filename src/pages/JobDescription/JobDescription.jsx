import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./JobDescription.module.scss";

const JobDescription = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await axios.get(`/api/jobs/${id}`);
        if (res.status === 200) {
          setJob(res.data.job || null);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  if (loading) return <h2>Loading job details...</h2>;
  if (!job) return <h2>Job not found.</h2>;

  return (
    <div className={styles.JobDescription}>
      <h1>{job.name}</h1>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Mode:</strong> {job.mode}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Technologies:</strong> {job.technologies.join(", ")}</p>
    </div>
  );
};

export default JobDescription;
