import { useState, useMemo } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import styles from './CandidatesKanban.module.scss';
import Column from './Column';

const CandidatesKanban = ({ candidates, setCandidates }) => {
    const stages = ['applied', 'screen', 'tech', 'offer', 'hired', 'rejected'];

    const candidatesByStage = useMemo(() => {
        const grouped = {};
        stages.forEach(stage => {
            grouped[stage] = candidates.filter(c => c.stage === stage);
        });
        return grouped;
    }, [candidates]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const activeContainer = active.data.current?.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId || over.id;

        if (activeContainer !== overContainer) {
            setCandidates(prev => {
                const activeIndex = prev.findIndex(c => c.id === activeId);
                if (activeIndex === -1) return prev;
                
                const updatedCandidates = [...prev];
                updatedCandidates[activeIndex] = {
                    ...updatedCandidates[activeIndex],
                    stage: overContainer,
                };
                return updatedCandidates;
            });
        }
    };

    return (
        <div className={styles.kanbanBoard}>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <SortableContext items={stages} strategy={horizontalListSortingStrategy}>
                    {stages.map(stage => (
                        <Column
                            key={stage}
                            id={stage}
                            title={stage.charAt(0).toUpperCase() + stage.slice(1)}
                            candidates={candidatesByStage[stage]}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default CandidatesKanban;