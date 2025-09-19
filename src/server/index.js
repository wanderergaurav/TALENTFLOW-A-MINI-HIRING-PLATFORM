import { createServer } from "miragejs";
import jobsData from "./jobs";
import candidatesData from "./candidates";

export default function makeServer() {
  let jobs = [...jobsData];
  let candidates = [...candidatesData];

  return createServer({
    routes() {
      this.namespace = "api";

      this.get("/jobs", () => {
        return { jobs };
      });

      this.post("/jobs", (schema, request) => {
        const newJob = JSON.parse(request.requestBody);
        jobs.push(newJob);
        return { job: newJob };
      });

      this.get("/jobs/:id", (schema, request) => {
        let id = request.params.id;
        let job = jobs.find(j => j.id === Number(id));
        return { job };
      });

      this.get("/candidates", () => {
        return { candidates };
      });

      this.get("/candidates/:id", (schema, request) => {
        let id = request.params.id;
        let candidate = candidates.find(c => c.id === Number(id));
        return { candidate };
      });
    },
  });
}