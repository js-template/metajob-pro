import type { Core } from "@strapi/strapi";
import appliedJobLifecycle from "./content-types/applied-job/lifecycles";
import companyLifecycle from "./content-types/company/lifecycles";
import jobLifecycle from "./content-types/job/lifecycles";

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase

  // Subscribing to applied-job model lifecycle events
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.applied-job"],
    ...appliedJobLifecycle,
  });

  // Subscribing to company model lifecycle events
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.company"],
    ...companyLifecycle,
  });

  // Registering lifecycle for the job model
  strapi.db.lifecycles.subscribe({
    models: ["plugin::metajob-backend.job"],
    ...jobLifecycle,
  });
};

export default bootstrap;
