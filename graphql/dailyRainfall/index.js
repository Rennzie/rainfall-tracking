import { gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Rainfalls: [DailyRainfall]
  }

  extend type Mutation {
    createRainfall(
      id: ID!
      guage_id: ID!
      rainfall: Int!
      date: String!
      unit: String!
    ): DailyRainfall
    updateRainfall(id: ID!, guage_id: ID!, rainfall: Int, unit: String, date: String): Message
    deleteRainfall(id: ID!): Message
  }

  type DailyRainfall {
    id: ID!
    rainfall: Int
    unit: String
    guage_id: ID
    date: String
  }
`;

const resolvers = {
  Query: {
    Rainfalls: async (parent, args, { DailyRainfall }) => {
      const rainfalls = await DailyRainfall.query();

      return rainfalls;
    }
  },
  Mutation: {
    createRainfall: async (parent, args, { DailyRainfall }) => {
      const rainfall = await DailyRainfall.query()
        .allowInsert('[rainfall, date, guage_id, unit]')
        .insert(args);

      return rainfall;
    },

    updateRainfall: async (parent, args, { DailyRainfall }) => {
      const updatedRainfall = await DailyRainfall.query()
        .findById(args.id)
        .patch(args);

      return { message: `Successfully updated ${updatedRainfall} rainfall entry` };
    },

    deleteRainfall: async (parent, args, { DailyRainfall }) => {
      const deletedRows = await DailyRainfall.query()
        .findById(args.id)
        .delete();
      return { message: `Succesfully delete ${deletedRows} rainfall entries` };
    }
  }
};

export default { typeDefs, resolvers };
