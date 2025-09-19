import styles from './Card.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Card = ({ id, name, mode, type, exp, status, onEdit, onArchive }) => {
    // Determine the text for the archive/unarchive button
    const isArchived = status === 'Archived';
    const archiveButtonText = isArchived ? 'Unarchive' : 'Archive';

    return (
        <div className={styles.jobCard}>
            <div className={styles.cardHeader}>
                {/* The job title is now a link to the details page */}
                <Link to={`/jobs/${id}`} className={styles.jobTitleLink}>
                    <h3 className={styles.jobTitle}>{name}</h3>
                </Link>
            </div>

            <div className={styles.jobMeta}>
                <p>{mode} | {type}</p>
                <p>{exp} Experience Required</p>
                <p>
                    Status:
                    <span
                        className={clsx(
                            styles.jobStatus,
                            status === 'open' && styles.isOpen,
                            status === 'closed' && styles.isClosed,
                            status === 'on_hold' && styles.isOnHold,
                            isArchived && styles.isArchived
                        )}
                    >
                        {status.replace('_', ' ')}
                    </span>
                </p>
            </div>

            <div className={styles.jobActions}>
                <button onClick={onEdit} className={styles.actionButton}>
                    Edit
                </button>
                <button
                    onClick={onArchive}
                    className={clsx(styles.actionButton, styles.archiveButton)}
                >
                    {archiveButtonText}
                </button>
            </div>
        </div>
    );
};

export default Card;