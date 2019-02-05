import { GraphQLDateTime } from 'graphql-iso-date';
import Farm from './farm/index';
import DailyRainfall from './dailyRainfall/index';
import MonthlyRainfall from './monthlyRainfall/index';
import TwelveMonthRunningRainfall from './twelveMonthRunningRainfall/index';
import RainGuage from './rainGuage/index';
import User from './user/schema';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  User.resolvers,
  customScalarResolver,
  Farm.resolvers,
  RainGuage.resolvers,
  DailyRainfall.resolvers,
  MonthlyRainfall.resolvers,
  TwelveMonthRunningRainfall.resolvers
];
