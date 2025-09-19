import styles from './Jobs.module.scss';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import JobsKanban from './JobsKanban';
import Card from './Card';
import * as components from '../../components';
import { FaList, FaTh } from 'react-icons/fa'; // Importing icons
import clsx from 'clsx'; // Importing clsx

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [view, setView] = useState('list'); // 'list' or 'kanban'

    useEffect(() => {
    async function fetchJobs() {
        try {
            const res = await axios.get('/api/jobs');
            // Safely set jobs to an array, falling back to an empty array
            setJobs(res.data?.jobs ?? []);
        } catch (error) {
            console.error("Failed to fetch jobs:", error);
            setJobs([]); // Also ensure jobs is an array on error
        } finally {
            setLoading(false);
        }
    }
    fetchJobs();
}, []);

    const filteredJobs = useMemo(() => {
        return jobs.filter(j => {
            const jobTitle = j.name || j.title;
            const matchesSearch = jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'all' || j.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [jobs, searchQuery, statusFilter]);

    const handleEdit = (jobId) => console.log(`Edit clicked for job ID: ${jobId}`);
    const handleArchive = (jobId) => {
        setJobs(jobs.map(j =>
            j.id === jobId ? { ...j, status: j.status === 'Open' ? 'Archived' : 'Open' } : j
        ));
    };

    // const { Card } = components.Jobs;

    return (
        <div className={styles.jobsPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Job Postings</h1>
                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                        className={styles.filterSelect}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="on_hold">On Hold</option>
                        <option value="Archived">Archived</option>
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
                    <div className={styles.loading}>Loading Jobs...</div>
                ) : (
                    <>
                        {view === 'list' && (
                            <div className={styles.listContainer}>
                                {filteredJobs.map(job => (
                                    <Card
                                        key={job.id}
                                        id={job.id}
                                        name={job.name || job.title}
                                        mode={job.mode}
                                        type={job.type}
                                        exp={job.experience}
                                        status={job.status}
                                        onEdit={() => handleEdit(job.id)}
                                        onArchive={() => handleArchive(job.id)}
                                    />
                                ))}
                            </div>
                        )}
                        {view === 'kanban' && <JobsKanban jobs={filteredJobs} setJobs={setJobs} />}
                    </>
                )}
            </main>
        </div>
    );
};

export default Jobs;