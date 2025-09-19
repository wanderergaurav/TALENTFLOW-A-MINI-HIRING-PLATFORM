import styles from './Card.module.scss';
import clsx from 'clsx';

const Card = ({ name, email, stage }) => {
    return (
        <div className={styles.candidateCard}>
            <div className={styles.avatar}>
                {name.charAt(0)}
            </div>
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.email}>{email}</p>
            </div>
            <div className={styles.stage}>
                <span className={clsx(styles.stageBadge, styles[stage])}>
                    {stage}
                </span>
            </div>
        </div>
    );
};

export default Card;