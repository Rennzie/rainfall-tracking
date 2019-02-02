import { GraphQLDateTime } from 'graphql-iso-date';
import Farm from './farm/index';
import DailyRainfall from './dailyRainfall/index';
import MonthlyRainfall from './monthlyRainfall/index';
import TwelveMonthRunningRainfall from './twelveMonthRunningRainfall/index';
import RainGuage from './rainGuage/index';

const customScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  customScalarResolver,
  Farm.resolvers,
  RainGuage.resolvers,
  DailyRainfall.resolvers,
  MonthlyRainfall.resolvers,
  TwelveMonthRunningRainfall.resolvers
];
