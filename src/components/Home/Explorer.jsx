import styles from "./Explorer.module.scss";
import { Link } from "react-router-dom";

const Explorer = () => {
  return (
    <div className={styles.Explorer}>
      <h2 className={styles.title}>Explore</h2>
      <div className={styles.items}>
        <Link to="/jobs" className={styles.link}>
          Jobs
        </Link>
        <Link to="/candidates" className={styles.link}>
          Candidates
        </Link>
        <Link to="/assessments" className={styles.link}>
          Assessments
        </Link>
      </div>
    </div>
  );
};

export default Explorer;
