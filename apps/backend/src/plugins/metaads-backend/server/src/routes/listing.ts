
export default {
  routes: [
    {
      method: 'POST',
      path: '/listings',
      handler: 'listing.create',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'PUT',
      path: '/listings/:id',
      handler: 'listing.update',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'DELETE',
      path: '/listings/:id',
      handler: 'listing.delete',
      config: {
        policies: ['global::is-authenticated'],
      },
    },
    {
      method: 'GET',
      path: '/listings',
      handler: 'listing.find',
    },
    {
      method: 'GET',
      path: '/listings/:id',
      handler: 'listing.findOne',
    },
  ],
};
