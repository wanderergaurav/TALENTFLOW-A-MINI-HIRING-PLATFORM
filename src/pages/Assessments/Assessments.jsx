import styles from './Assessments.module.scss';
import { useState, useMemo } from 'react';
import AssessmentCard from './AssessmentCard'; // We will create this next
import { FaFilter, FaUserGraduate, FaUserTie } from 'react-icons/fa';

// Mock data - replace with your API call
const mockAssessments = [
    { id: 1, title: 'React Front-End Developer Test', jobRole: 'Software Engineer II', type: 'Technical', duration: 90, dueDate: '2025-10-15T23:59:59Z', status: 'Upcoming' },
    { id: 2, title: 'Leadership & Teamwork Evaluation', jobRole: 'Project Manager', type: 'Behavioral', duration: 45, dueDate: '2025-10-10T23:59:59Z', status: 'Upcoming' },
    { id: 3, title: 'Data Structures & Algorithms Challenge', jobRole: 'DevOps Engineer', type: 'Technical', duration: 120, dueDate: '2025-09-20T23:59:59Z', status: 'Completed' },
    { id: 4, title: 'UI/UX Design Principles', jobRole: 'UX Designer', type: 'Technical', duration: 60, dueDate: '2025-10-05T23:59:59Z', status: 'Upcoming' },
    { id: 5, title: 'Cloud Security Fundamentals', jobRole: 'Security Analyst', type: 'Technical', duration: 75, dueDate: '2025-09-01T23:59:59Z', status: 'Expired' },
    { id: 6, title: 'Situational Judgement Test', jobRole: 'All Roles', type: 'Behavioral', duration: 30, dueDate: '2025-10-20T23:59:59Z', status: 'Upcoming' },
];

const Assessments = () => {
    const [assessments, setAssessments] = useState(mockAssessments);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ type: 'all', status: 'all' });
    const [userRole, setUserRole] = useState('student'); // 'student' or 'hr'

    const filteredAssessments = useMemo(() => {
        return assessments.filter(assessment => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = assessment.title.toLowerCase().includes(searchLower) || assessment.jobRole.toLowerCase().includes(searchLower);
            const matchesType = filters.type === 'all' || assessment.type.toLowerCase() === filters.type;
            const matchesStatus = filters.status === 'all' || assessment.status.toLowerCase() === filters.status;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [assessments, searchQuery, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.assessmentsPage}>
            <header className={styles.header}>
                <div className={styles.titleBar}>
                    <h1 className={styles.title}>Assessments</h1>
                    <div className={styles.roleSwitcher}>
                        <button onClick={() => setUserRole('student')} className={userRole === 'student' ? styles.active : ''}>
                            <FaUserGraduate /> Student View
                        </button>
                        <button onClick={() => setUserRole('hr')} className={userRole === 'hr' ? styles.active : ''}>
                            <FaUserTie /> HR View
                        </button>
                    </div>
                </div>
                <div className={styles.controls}>
                    <input
                        type="text"
                        placeholder="Search by title or role..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className={styles.filters}>
                        <select name="type" className={styles.filterSelect} value={filters.type} onChange={handleFilterChange}>
                            <option value="all">All Types</option>
                            <option value="Technical">Technical</option>
                            <option value="Behavioral">Behavioral</option>
                        </select>
                        <select name="status" className={styles.filterSelect} value={filters.status} onChange={handleFilterChange}>
                            <option value="all">All Statuses</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Completed">Completed</option>
                            <option value="Expired">Expired</option>
                        </select>
                    </div>
                     {userRole === 'hr' && (
                        <button className={styles.createButton}>Create New</button>
                    )}
                </div>
            </header>

            <main className={styles.mainContent}>
                {filteredAssessments.length > 0 ? (
                    <div className={styles.gridContainer}>
                        {filteredAssessments.map(assessment => (
                            <AssessmentCard
                                key={assessment.id}
                                assessment={assessment}
                                userRole={userRole}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        <h3>No assessments found</h3>
                        <p>Try adjusting your search or filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Assessments;