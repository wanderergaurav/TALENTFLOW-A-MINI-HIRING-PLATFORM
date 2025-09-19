import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './CandidatesKanban.module.scss';
import { Link } from 'react-router-dom';

const KanbanCard = ({ candidate }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: candidate.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.kanbanCard}>
             <Link to={`/candidates/${candidate.id}`}>
                <p>{candidate.name}</p>
                <small>{candidate.email}</small>
            </Link>
        </div>
    );
};

export default KanbanCard;