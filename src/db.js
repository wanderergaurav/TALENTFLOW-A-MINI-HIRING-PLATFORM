import Dexie from 'dexie';

export const db = new Dexie('TalentFlowDB');

db.version(1).stores({
  jobs: '++id, name, status, order',
  candidates: '++id, name, email, stage',
  assessments: 'jobId', // Using jobId as the primary key
  assessmentResponses: '++id, assessmentId, candidateId',
});

// Add a hook to populate initial data if the database is empty
db.on('populate', async () => {
  const { default: jobsData } = await import('./server/jobs');
  const { generateCandidates } = await import('./server/seed');
  const candidatesData = generateCandidates(1000); // Generate 1000 candidates

  await db.jobs.bulkAdd(jobsData.map((job, index) => ({ ...job, order: index })));
  await db.candidates.bulkAdd(candidatesData);
});

export default db;