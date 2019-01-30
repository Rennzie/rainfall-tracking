import { gql } from 'apollo-server';
import moment from 'moment';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Rainfalls: [DailyRainfall]
    MoreDailyRainfall(limit: Int!, cursor: String!, guageId: ID!): MoreDailyRainfall
  }

  extend type Mutation {
    createRainfall(
      id: ID!
      guage_id: ID!
      rainfall: Int!
      date: String!
      unit: String!
    ): DailyRainfall
    updateRainfall(id: ID!, guageId: ID!, rainfall: Int, unit: String, date: String): Message
    deleteRainfall(id: ID!): Message
  }
  type MoreDailyRainfall {
    cursor: String
    rainfall: [DailyRainfall]
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
      const rainfalls = await DailyRainfall.query().orderBy('date', 'desc');

      return rainfalls;
    },
    MoreDailyRainfall: async (parent, { limit, cursor, guageId }, { DailyRainfall }) => {
      const moreRainfalls = await DailyRainfall.query()
        .where('guage_id', '=', guageId)
        .andWhere('date', '<', moment(parseInt(cursor, 10)).format('YYYY-MM-DD'))
        .orderBy('date', 'desc')
        .limit(limit);

      let newCursor;

      if (moreRainfalls.length) {
        newCursor = moreRainfalls[limit - 1].date;
      }

      const moreDailyRainfall = { cursor: newCursor, rainfall: moreRainfalls };

      return moreDailyRainfall;
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
