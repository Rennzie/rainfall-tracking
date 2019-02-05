import { gql } from 'apollo-server';
import Farm from './farm/index';
import DailyRainfall from './dailyRainfall/index';
import MonthlyRainfall from './monthlyRainfall/index';
import TwelveMonthRunningRainfall from './twelveMonthRunningRainfall/index';
import RainGuage from './rainGuage/index';
import User from './user/schema';

const linkSchema = gql`
  type Query {
    dummy: Boolean
  }

  type Mutation {
    dummy: Boolean
  }

  type Meta {
    count: Int
  }

  type Message {
    message: String
  }

  #scalar Url
  scalar Date
`;

export default [
  linkSchema,
  User.typeDefs,
  Farm.typeDefs,
  RainGuage.typeDefs,
  DailyRainfall.typeDefs,
  MonthlyRainfall.typeDefs,
  TwelveMonthRunningRainfall.typeDefs
];
