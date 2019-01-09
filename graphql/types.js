import { gql } from 'apollo-server';
import Farm from './farm/index';
import Rainfall from './rainfall/index';

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
  #scalar Date
`;

export default [linkSchema, Farm.typeDefs, Rainfall.typeDefs];
