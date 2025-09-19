import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
// Import your logo from the assets folder
import talentFlowLogo from "../../assets/Flow-removebg-preview.png";

const Home = () => {
  return (
    <div className={styles.HomePage}>
      <section className={styles.hero}>
        {/* Use the imported logo and add a className and alt text */}
        <img
          src={talentFlowLogo}
          alt="TalentFlow company logo"
          className={styles.heroLogo}
        />
        <div className={styles.heroContent}>
          <h1>
            Connecting Talent <br /> with Opportunity
          </h1>
          <p>
            Your gateway to a world of opportunities. Explore, connect, and
            grow with us.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/jobs" className={styles.button}>
              Explore Jobs
            </Link>
            <Link to="/candidates" className={styles.button}>
              Find Candidates
            </Link>
            <Link to="/assessments" className={styles.button}>
              Assessments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;