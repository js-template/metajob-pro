
import { Strapi } from '@strapi/strapi';
import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default ({ strapi }: { strapi: Strapi }) => ({
  async create(data: any, user: any) {
    const entity = await strapi.entityService.create('plugin::metaads-backend.listing', {
      data: {
        ...data,
        seller: user.id,
      },
    });
    return entity;
  },

  async update(id: number, data: any, user: any) {
    const listing = await strapi.entityService.findOne('plugin::metaads-backend.listing', id);
    
    if (!listing) {
      throw new ApplicationError('Listing not found');
    }

    if (listing.seller.id !== user.id) {
      throw new ApplicationError('Unauthorized');
    }

    const entity = await strapi.entityService.update('plugin::metaads-backend.listing', id, {
      data,
    });
    return entity;
  },

  async delete(id: number, user: any) {
    const listing = await strapi.entityService.findOne('plugin::metaads-backend.listing', id);
    
    if (!listing) {
      throw new ApplicationError('Listing not found');
    }

    if (listing.seller.id !== user.id) {
      throw new ApplicationError('Unauthorized');
    }

    const entity = await strapi.entityService.delete('plugin::metaads-backend.listing', id);
    return entity;
  },

  async find(query: any) {
    const entities = await strapi.entityService.findMany('plugin::metaads-backend.listing', query);
    return entities;
  },

  async findOne(id: number, query: any) {
    const entity = await strapi.entityService.findOne('plugin::metaads-backend.listing', id, query);
    return entity;
  }
});
