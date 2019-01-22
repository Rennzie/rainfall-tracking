import { gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Farms: [Farm]
    Farm(id: ID!): Farm
  }

  extend type Mutation {
    createFarm(name: String, farm_owner: String): Farm
    updateFarm(id: ID!, name: String, farm_owner: String): Farm
    deleteFarm(id: ID!): Message
  }

  # This "Farm" is a parent type which has a oneToMany relation with dailyRainfall and MonthlyRainfall.
  type Farm {
    id: ID!
    name: String
    farm_owner: String
    rainGuages: [RainGuage]
  }
`;

const resolvers = {
  Query: {
    Farms: async (parent, args, { Farm }) => {
      const farms = await Farm.query().eager('rainfall');

      return farms;
    },

    Farm: async (parent, { id }, { Farm }) => {
      const farm = await Farm.query().findById(id);

      return farm;
    }
  },

  Mutation: {
    createFarm: async (parent, args, { Farm }) => {
      const farm = await Farm.query()
        .allowInsert('[name, farm_owner]')
        .insert(args);

      return farm;
    },

    updateFarm: async (parent, args, { Farm }) => {
      await Farm.query()
        .findById(args.id)
        .patch(args);
      const farm = await Farm.query().findById(args.id);
      return farm;
    },

    deleteFarm: async (parent, args, { Farm, Rainfall }) => {
      const deleteFarmRainfallRows = await Rainfall.query()
        .delete()
        .where('farm_id', '=', args.id);

      const deleteFarmRows = await Farm.query().deleteById(args.id);

      return {
        message: `Successfully deleted ${deleteFarmRows} farm and ${deleteFarmRainfallRows} rainfall entries`
      };
    }
  },

  Farm: {
    rainGuages: async (parent, __, { RainGuage }) => {
      const rainGuages = await RainGuage.query().where('farm_id', '=', parent.id);

      return rainGuages;
    }
  }
};

export default { typeDefs, resolvers };
