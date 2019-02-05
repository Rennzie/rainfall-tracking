import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';

import atob from 'atob';
import Farm from './src/models/farm.schema';
import RainGuage from './src/models/rainGuage.schema';
import { DailyRainfall, rainfallFuncs } from './src/models/dailyRainfall.schema';
import { User } from './src/graphql/user/model';
import MonthlyRainfall from './src/models/monthlyRainfall.schema';
import TwelveMonthRunningRainfall from './src/models/twelveMonthRunningRainfall.schema';

import typeDefs from './src/graphql/types';
import resolvers from './src/graphql/resolvers';

// This is used for the authorizeUser function as node does not have atob normally
global.atob = atob;

dotenv.config();

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  /**
   *  Load the context as a function which returns the context object.
   *  This object is then available to every resolver
   *
   *  First check to see if an authorization header was sent, check this header is valid,
   *  if it is then find the user and return the user profile to be used later for role/permission
   *  based authorization. We should modify what comes back from the authrorizedUser function to
   *  only give the userId and an array of rols and permissions
   *
   *  If there is no token or the token has expired authorizeUser will return an empty string
   */
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    // return a user profile. Will later be trimmed to id, and array or roles and permissions
    const authorizedUser = User.authorizeUser(token);

    return {
      authorizedUser,
      Farm,
      RainGuage,
      DailyRainfall,
      MonthlyRainfall,
      TwelveMonthRunningRainfall,
      rainfallFuncs,
      User
    };
  },
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
  }
  // formatResponse: response => {
  //   console.log(response);
  //   return response;
  // }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
