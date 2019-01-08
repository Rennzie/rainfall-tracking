import { gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Farms: [Farm]
    Farm(id: Int!): Farm
  }

  extend type Mutation {
    createFarm(name: String): Farm
  }

  # This "Farm" is a parent type which has a oneToMany relation with Rainfall.
  type Farm {
    id: Int
    name: String
    farm_owner: String
    rainfall: [Rainfall]
  }
`;

const resolvers = {
  Query: {
    Farms: async (parent, args, { Farm }) => {
      const farms = await Farm.query().eager('rainfall');

      return farms;
    },

    Farm: async (parent, { id }, { Farm }) => {
      const farm = await Farm.query()
        .findById(id)
        .eager('rainfall');

      return farm;
    }
  },

  Mutation: {
    createFarm: async (parent, args, { Farm }) => {
      await Farm.query().insertGraph(args);
    }
  }
};

export default { typeDefs, resolvers };
