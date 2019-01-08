import { gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  extend type Query {
    Rainfalls: [Rainfall]
  }

  type Rainfall {
    id: Int
    rain: Int
    farm_id: Int
  }
`;

const resolvers = {
  Query: {
    Rainfalls: async (parent, args, { Rainfall }) => {
      const rainfalls = await Rainfall.query();

      return rainfalls;
    }
  }
};

export default { typeDefs, resolvers };
