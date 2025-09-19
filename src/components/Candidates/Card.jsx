import styles from './Card.module.scss';

const Card=(props)=>{
    return (
        <div className={styles.card}>
            <h1 className={styles.h1}>{props.name}</h1>
            <h2 className={styles.h2}>{props.email}</h2>
        </div>
    );
}

export default Card;