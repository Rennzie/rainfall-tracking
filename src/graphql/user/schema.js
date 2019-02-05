import { gql, AuthenticationError } from 'apollo-server';

const typeDefs = gql`
  extend type Query {
    login(email: String!, password: String!): Token
  }

  type Token {
    token: String
  }
`;

const resolvers = {
  Query: {
    login: async (parent, { email, password }, { User, authorizedUser }) => {
      const token = await User.authenticateUser(email, password);
      if (!token)
        throw new AuthenticationError('Your email or password is incorrect, please try again.');
      return { token };
    }
  }
};

export default { typeDefs, resolvers };
