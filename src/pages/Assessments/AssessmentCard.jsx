import styles from './AssessmentCard.module.scss';
import { FaLaptopCode, FaUsers, FaClock, FaCalendarTimes, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import clsx from 'clsx';

const AssessmentCard = ({ assessment, userRole }) => {
    const { title, jobRole, type, duration, dueDate, status } = assessment;

    const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const getStatusIcon = () => {
        switch (status.toLowerCase()) {
            case 'upcoming': return <FaCalendarTimes />;
            case 'completed': return <FaCheckCircle />;
            case 'expired': return <FaExclamationTriangle />;
            default: return null;
        }
    };

    return (
        <div className={styles.card}>
            <div className={clsx(styles.statusBar, styles[status.toLowerCase()])}>
                {getStatusIcon()}
                <span>{status}</span>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.typeIcon}>
                        {type === 'Technical' ? <FaLaptopCode /> : <FaUsers />}
                    </div>
                    <div>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={styles.jobRole}>{jobRole}</p>
                    </div>
                </div>
                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <FaClock />
                        <span>{duration} min</span>
                    </div>
                    <div className={styles.metaItem}>
                        <FaCalendarTimes />
                        <span>Due: {formattedDate}</span>
                    </div>
                </div>
                <div className={styles.actions}>
                    {userRole === 'student' && (
                        <>
                            {status === 'Upcoming' && <button className={styles.applyButton}>Start Test</button>}
                            {status === 'Completed' && <button className={clsx(styles.actionButton, styles.resultsButton)}>View Results</button>}
                        </>
                    )}
                    {userRole === 'hr' && (
                        <>
                            <button className={styles.actionButton}>Edit</button>
                            <button className={clsx(styles.actionButton, styles.archiveButton)}>Archive</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssessmentCard;