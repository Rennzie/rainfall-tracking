import { gql } from 'apollo-server';
import moment from 'moment';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Rainfalls: [DailyRainfall]
    MoreDailyRainfall(limit: Int!, cursor: String!, guageId: ID!): MoreDailyRainfall
    MonthRainfallPage(year: Int!, month: Int!, guageId: ID!): [DailyRainfall]
    RainfallPerGuage(guageId: ID!): [DailyRainfall]
  }

  extend type Mutation {
    createRainfall(
      id: ID!
      guage_id: ID!
      rainfall: Int!
      date: Date!
      unit: String!
    ): DailyRainfall
    updateRainfall(id: ID!, guageId: ID!, rainfall: Int, unit: String, date: Date): Message
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
    date: Date
  }
`;

const resolvers = {
  Query: {
    Rainfalls: async (parent, args, { DailyRainfall }) => {
      const rainfalls = await DailyRainfall.query().orderBy('date', 'desc');

      return rainfalls;
    },
    RainfallPerGuage: async (parent, { guageId }, { rainfallFuncs }) => {
      const rainfall = await rainfallFuncs.getRainfallPerRainGuage(guageId);

      return rainfall;
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
    },

    MonthRainfallPage: async (parent, { year, month, guageId }, { DailyRainfall }) => {
      const monthRainfallPage = await DailyRainfall.query()
        .where('guage_id', '=', guageId)
        .andWhereRaw('EXTRACT(YEAR FROM date::date) = ?', [year])
        // Postgres months start at one, moment at 0. Incoming month value is moment derived
        .andWhereRaw('EXTRACT(MONTH FROM date::date) = ?', [month + 1])
        .orderBy('date', 'desc');

      return monthRainfallPage;
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
