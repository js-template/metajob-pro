import type { Core } from "@strapi/strapi";
import appliedJobLifecycle from "./content-types/applied-job/lifecycles";
import companyLifecycle from "./content-types/company/lifecycles";
import jobLifecycle from "./content-types/job/lifecycles";
import resumeLifecycle from "./content-types/resume/lifecycles";

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase

  // Subscribing to applied-job model lifecycle events
  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.applied-job"],
    ...appliedJobLifecycle,
  });

  // Subscribing to resume model lifecycle events
  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.resume"],
    ...resumeLifecycle,
  });

  // Subscribing to company model lifecycle events
  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.company"],
    ...companyLifecycle,
  });

  // Registering lifecycle for the job model
  // @ts-ignore
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.job"],
    ...jobLifecycle,
  });
};

export default bootstrap;
