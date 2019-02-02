import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';

import Farm from './src/models/farm.schema';
import RainGuage from './src/models/rainGuage.schema';
import DailyRainfall from './src/models/dailyRainfall.schema';
import MonthlyRainfall from './src/models/monthlyRainfall.schema';
import TwelveMonthRunningRainfall from './src/models/twelveMonthRunningRainfall.schema';

import typeDefs from './src/graphql/types';
import resolvers from './src/graphql/resolvers';

dotenv.config();

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Farm, RainGuage, DailyRainfall, MonthlyRainfall, TwelveMonthRunningRainfall },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    generateClientInfo: ({ request }) => {
      // eslint-disable-next-line no-bitwise
      const headers = request.http & request.http.headers;
      if (headers) {
        return {
          clientName: headers['apollo-client-name'],
          clientVersion: headers['apollo-client-version']
        };
      }
      return {
        clientName: 'Unknown Client',
        clientVersion: 'Unversioned'
      };
    }
  },
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
