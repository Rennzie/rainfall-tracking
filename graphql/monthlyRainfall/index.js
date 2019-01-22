import { gql } from 'apollo-server';
// import farm from '../farm';

const typeDefs = gql`
  extend type Query {
    FarmMonthlyRainfall(guageId: ID!): [MonthlyRainfall]
  }
  type MonthlyRainfall {
    id: ID!
    rainfall: Int
    unit: String
    date: String
    year: Int
    month: Int
    guage_id: ID
  }
`;

const resolvers = {
  Query: {
    FarmMonthlyRainfall: async (parent, { guageId }, { MonthlyRainfall }) => {
      // Need to worry about batch loading when we scale
      const farmMonthlyRainfall = await MonthlyRainfall.query().where('farm_id', '=', guageId);
      return farmMonthlyRainfall;
    }
  }
};

export default { typeDefs, resolvers };
