import { useMemo } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import styles from './JobsKanban.module.scss';
import Column from './Column';

const JobsKanban = ({ jobs, setJobs }) => {
    const statuses = ['open', 'closed', 'on_hold'];

    const jobsByStatus = useMemo(() => {
        const grouped = {};
        statuses.forEach(status => {
            grouped[status] = jobs.filter(j => j.status === status);
        });
        return grouped;
    }, [jobs]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overContainer = over.data.current?.sortable.containerId || over.id;

        setJobs(prev => {
            const activeIndex = prev.findIndex(j => j.id === activeId);
            if (activeIndex === -1) return prev;
            
            const updatedJobs = [...prev];
            updatedJobs[activeIndex] = {
                ...updatedJobs[activeIndex],
                status: overContainer,
            };
            return updatedJobs;
        });
    };

    return (
        <div className={styles.kanbanBoard}>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={statuses} strategy={horizontalListSortingStrategy}>
                    {statuses.map(status => (
                        <Column
                            key={status}
                            id={status}
                            title={status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            jobs={jobsByStatus[status]}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default JobsKanban;