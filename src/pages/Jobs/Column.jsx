import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './JobsKanban.module.scss';
import KanbanCard from './KanbanCard';

const Column = ({ id, title, jobs }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.column}>
            <h3 className={styles.columnTitle}>{title}</h3>
            <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.cardContainer}>
                    {jobs.map(job => (
                        <KanbanCard key={job.id} job={job} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default Column;