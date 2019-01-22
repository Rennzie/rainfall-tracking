import { gql } from 'apollo-server';

const typeDefs = gql`
  type TwelveMonthRunningRainfall {
    id: ID!
    rainfall: Int
    unit: String
    date: String
    year: Int
    month: Int
    guage_id: ID
  }
`;

export default { typeDefs };
