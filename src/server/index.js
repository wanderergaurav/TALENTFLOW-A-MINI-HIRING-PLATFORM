import { createServer, Response } from "miragejs";
import db from '../db';

// Function to simulate network delay
const withDelay = (fn, delay = 800) => {
  return async (...args) => {
    // Inject artificial latency (200–1200ms)
    const randomDelay = Math.random() * 1000 + 200;
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    return fn(...args);
  };
};

// Function to simulate potential server errors
const withErrors = (fn, errorRate = 0.1) => {
    return (...args) => {
        if (Math.random() < errorRate) {
            return new Response(500, {}, { error: 'A random server error occurred.' });
        }
        return fn(...args);
    };
};

export default function makeServer() {
  return createServer({
    routes() {
      this.namespace = "api";

      // JOBS
      this.get("/jobs", withDelay(async (schema, request) => {
        const jobs = await db.jobs.orderBy('order').toArray();
        return { jobs };
      }));

      this.post("/jobs", withDelay(withErrors(async (schema, request) => {
        const newJobData = JSON.parse(request.requestBody);
        const count = await db.jobs.count();
        const newJob = { ...newJobData, order: count };
        const id = await db.jobs.add(newJob);
        return { job: { ...newJob, id } };
      })));

      this.patch("/jobs/:id", withDelay(withErrors(async (schema, request) => {
        const id = Number(request.params.id);
        const attrs = JSON.parse(request.requestBody);
        await db.jobs.update(id, attrs);
        const updatedJob = await db.jobs.get(id);
        return { job: updatedJob };
      })));

      this.patch("/jobs/reorder", withDelay(withErrors(async (schema, request) => {
          const { jobs } = JSON.parse(request.requestBody);
          const updates = jobs.map((job, index) => db.jobs.update(job.id, { order: index }));
          await Promise.all(updates);
          return { success: true };
      }, 0.15))); // 15% error rate for reordering

      this.get("/jobs/:id", withDelay(async (schema, request) => {
          const id = Number(request.params.id);
          const job = await db.jobs.get(id);
          return { job };
      }));


      // CANDIDATES
      this.get("/candidates", withDelay(async () => {
        const candidates = await db.candidates.toArray();
        return { candidates };
      }));

      this.patch("/candidates/:id", withDelay(withErrors(async (schema, request) => {
        const id = Number(request.params.id);
        const { stage } = JSON.parse(request.requestBody);
        const candidate = await db.candidates.get(id);
        const newTimelineEntry = { status: stage, date: new Date() };
        await db.candidates.update(id, {
            stage,
            timeline: [...(candidate.timeline || []), newTimelineEntry]
        });
        const updatedCandidate = await db.candidates.get(id);
        return { candidate: updatedCandidate };
      })));

      this.get("/candidates/:id", withDelay(async (schema, request) => {
          const id = Number(request.params.id);
          const candidate = await db.candidates.get(id);
          return { candidate };
      }));

      this.get("/candidates/:id/timeline", withDelay(async (schema, request) => {
          const id = Number(request.params.id);
          const candidate = await db.candidates.get(id);
          return { timeline: candidate ? candidate.timeline || [] : [] };
      }));

      // ASSESSMENTS
      this.get("/assessments/:jobId", withDelay(async (schema, request) => {
        const jobId = Number(request.params.jobId);
        let assessment = await db.assessments.get(jobId);
        if (!assessment) {
            assessment = { jobId, sections: [] };
        }
        return { assessment };
      }));

      this.put("/assessments/:jobId", withDelay(withErrors(async (schema, request) => {
        const jobId = Number(request.params.jobId);
        const data = JSON.parse(request.requestBody);
        await db.assessments.put({ jobId, ...data });
        return { assessment: { jobId, ...data } };
      })));
    },
  });
}