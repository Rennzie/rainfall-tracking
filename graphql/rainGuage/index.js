import { gql } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    RainGuage(id: ID!): RainGuage
  }
  type RainGuage {
    id: ID!
    farm_id: ID
    dailyRainfall: [DailyRainfall]
    monthlyRainfall: [MonthlyRainfall]
    twelveMonthRunningRainfall: [TwelveMonthRunningRainfall]
  }
`;
const resolvers = {
  Query: {
    RainGuage: async (parent, { id }, { RainGuage }) => {
      const rainGuage = await RainGuage.query().findById(id);

      return rainGuage;
    }
  },
  RainGuage: {
    dailyRainfall: async ({ id }, __, { DailyRainfall }) => {
      const dailyRainfall = await DailyRainfall.query().where('guage_id', '=', id);
      return dailyRainfall;
    },

    monthlyRainfall: async ({ id }, __, { MonthlyRainfall }) => {
      const monthlyRainfall = await MonthlyRainfall.query().where('guage_id', '=', id);

      return monthlyRainfall;
    },

    twelveMonthRunningRainfall: async ({ id }, __, { TwelveMonthRunningRainfall }) => {
      const twelveMonthRunningRainfall = await TwelveMonthRunningRainfall.query().where(
        'guage_id',
        '=',
        id
      );
      return twelveMonthRunningRainfall;
    }
  }
};

export default { typeDefs, resolvers };
