const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if user is authenticated
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info,
    );

    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // take a copy of the updates and remove the id from updates
    const { id, ...updates } = args;

    //run update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // 2. check if they own that item or have the permissions
    // TODO
    // 3. delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;
