import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

const Card = (props) => {
    const handleActionClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={`${styles.Card} ${props.status === 'Archived' ? styles.archived : ''}`}>
            <Link className={styles.link} to={`/jobs/${props.id}`}>
                <h1 className={styles.h1}>{props.name}</h1>
            </Link>
            <h3 className={styles.h2}>{props.mode} | {props.type}</h3>
            <h3 className={styles.h3}>{props.exp} Experience Required</h3>
            <p className={styles.status}>Status: {props.status}</p>
            <div className={styles.actions} onClick={handleActionClick}>
                <button onClick={props.onEdit}>Edit</button>
                <button onClick={props.onArchive}>
                    {props.status === 'Open' ? 'Archive' : 'Unarchive'}
                </button>
            </div>
        </div>
    );
};

export default Card;