import { faker } from '@faker-js/faker';

export function generateCandidates(count = 1000) {
  const candidates = [];
  const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

  for (let i = 0; i < count; i++) {
    candidates.push({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      stage: faker.helpers.arrayElement(stages),
      appliedJobs: [faker.number.int({ min: 1, max: 40 })],
      timeline: [
        { status: 'applied', date: faker.date.past() },
      ]
    });
  }
  return candidates;
}