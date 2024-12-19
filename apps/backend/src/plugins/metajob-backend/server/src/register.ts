import type { Core } from "@strapi/strapi";
import Components from "./components";

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase

  // *** get the plugin all components and add the new component

  Object.values(Components).forEach((data) => {
    strapi.components[data.uid] = data;
  });
};

export default register;
