
import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state;
    const data = ctx.request.body;
    
    const entity = await strapi
      .plugin('metaads-backend')
      .service('listing')
      .create(data, user);

    return entity;
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const data = ctx.request.body;

    const entity = await strapi
      .plugin('metaads-backend')
      .service('listing')
      .update(id, data, user);

    return entity;
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi
      .plugin('metaads-backend')
      .service('listing')
      .delete(id, user);

    return entity;
  },

  async find(ctx) {
    const query = ctx.query;

    const entities = await strapi
      .plugin('metaads-backend')
      .service('listing')
      .find(query);

    return entities;
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const query = ctx.query;

    const entity = await strapi
      .plugin('metaads-backend')
      .service('listing')
      .findOne(id, query);

    return entity;
  }
});
