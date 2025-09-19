import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './JobsKanban.module.scss';
import { Link } from 'react-router-dom';

const KanbanCard = ({ job }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: job.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.kanbanCard}>
             <Link to={`/jobs/${job.id}`}>
                <p>{job.title}</p>
                <small>{job.location}</small>
            </Link>
        </div>
    );
};

export default KanbanCard;