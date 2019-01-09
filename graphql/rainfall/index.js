import { gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Rainfalls: [Rainfall]
  }

  extend type Mutation {
    createRainfallRelated(farm_id: Int!, rain: Int, date: String): Rainfall
    createRainfall(farm_id: Int!, rain: Int, date: String): Rainfall
    updateRainfall(id: Int!, rain: Int, date: String): Message
    deleteRainfall(id: Int!): Message
  }

  type Rainfall {
    id: Int
    rain: Int
    farm_id: Int
    date: String
  }
`;

const resolvers = {
  Query: {
    Rainfalls: async (parent, args, { Rainfall }) => {
      const rainfalls = await Rainfall.query();

      return rainfalls;
    }
  },
  Mutation: {
    createRainfallRelated: async (parent, args, { Farm }) => {
      const farm = await Farm.query().findById(args.farm_id);

      await farm
        .$relatedQuery('rainfall')
        .allowInsert('[rain, date]')
        .insert(args);

      return farm;
    },

    createRainfall: async (parent, args, { Rainfall }) => {
      const rainfall = await Rainfall.query()
        .allowInsert('[rain, data, farm_id]')
        .insert(args);

      return rainfall;
    },

    updateRainfall: async (parent, args, { Rainfall }) => {
      const updatedRainfall = await Rainfall.query()
        .findById(args.id)
        .patch(args);
      return { message: `Successfully updated ${updatedRainfall} rainfall entry` };
    },

    deleteRainfall: async (parent, args, { Rainfall }) => {
      const deletedRows = await Rainfall.query()
        .findById(args.id)
        .delete();
      return { message: `Succesfully delete ${deletedRows} rainfall entries` };
    }
  }
};

export default { typeDefs, resolvers };
