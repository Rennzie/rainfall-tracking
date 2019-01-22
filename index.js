import { ApolloServer } from 'apollo-server';

import Farm from './models/farm.schema';
import RainGuage from './models/rainGuage.schema';
import DailyRainfall from './models/dailyRainfall.schema';
import MonthlyRainfall from './models/monthlyRainfall.schema';
import TwelveMonthRunningRainfall from './models/twelveMonthRunningRainfall.schema';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { Farm, RainGuage, DailyRainfall, MonthlyRainfall, TwelveMonthRunningRainfall }
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
