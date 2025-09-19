import styles from './Candidates.module.scss';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import CandidatesKanban from './CandidatesKanban';
import * as components from '../../components';
import { FaList, FaTh } from 'react-icons/fa';
import Card from './Card';
import clsx from 'clsx';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [stageFilter, setStageFilter] = useState("all");
    const [view, setView] = useState('list');

    useEffect(() => {
        async function fetchCandidates() {
            try {
                const res = await axios.get('/api/candidates');
                setCandidates(res.data.candidates);
            } catch (error) {
                console.error("Failed to fetch candidates:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCandidates();
    }, []);

    const filteredCandidates = useMemo(() => {
        return candidates.filter(c => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = c.name.toLowerCase().includes(searchLower) || c.email.toLowerCase().includes(searchLower);
            const matchesStage = stageFilter === 'all' || c.stage === stageFilter;
            return matchesSearch && matchesStage;
        });
    }, [candidates, searchQuery, stageFilter]);

    // const { Card } = components.Candidates;

    // Row component for the virtualized list
    const CandidateRow = ({ index, style }) => {
        const candidate = filteredCandidates[index];
        return (
            <div style={style} className={styles.candidateRowWrapper}>
                <Link to={`/candidates/${candidate.id}`} className={styles.candidateLink}>
                    <Card key={candidate.id} name={candidate.name} email={candidate.email} stage={candidate.stage} />
                </Link>
            </div>
        );
    };

    return (
        <div className={styles.candidatesPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Candidates</h1>
                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className={styles.filterSelect}
                        value={stageFilter}
                        onChange={(e) => setStageFilter(e.target.value)}
                    >
                        <option value="all">All Stages</option>
                        <option value="applied">Applied</option>
                        <option value="screen">Screen</option>
                        <option value="tech">Tech</option>
                        <option value="offer">Offer</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <div className={styles.viewToggle}>
                        <button
                            className={clsx(styles.toggleButton, view === 'list' && styles.active)}
                            onClick={() => setView('list')}
                            aria-label="List View"
                        >
                            <FaList />
                        </button>
                        <button
                            className={clsx(styles.toggleButton, view === 'kanban' && styles.active)}
                            onClick={() => setView('kanban')}
                            aria-label="Kanban View"
                        >
                            <FaTh />
                        </button>
                    </div>
                </div>
            </header>

            <main className={styles.mainContent}>
                {loading ? (
                    <div className={styles.loading}>Loading Candidates...</div>
                ) : (
                    <>
                        {view === 'list' && (
                            <div className={styles.listContainer}>
                                <List
                                    height={600}
                                    itemCount={filteredCandidates.length}
                                    itemSize={85} // Height of each row
                                    width="100%"
                                >
                                    {CandidateRow}
                                </List>
                            </div>
                        )}
                        {view === 'kanban' && <CandidatesKanban candidates={filteredCandidates} setCandidates={setCandidates} />}
                    </>
                )}
            </main>
        </div>
    );
};

export default Candidates;