import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './CandidatesKanban.module.scss';
import KanbanCard from './KanbanCard';

const Column = ({ id, title, candidates }) => {
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
            <SortableContext items={candidates.map(c => c.id)} strategy={verticalListSortingStrategy}>
                <div className={styles.cardContainer}>
                    {candidates.map(candidate => (
                        <KanbanCard key={candidate.id} candidate={candidate} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
};

export default Column;