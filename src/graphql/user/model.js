/* eslint-disable import/prefer-default-export */
import Knex from 'knex';
import { Model } from 'objection';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { ApolloError } from 'apollo-server';
import connection from '../../../knexfile';

// import { SECRET } from '../config/environment';

const knexConnection = Knex(connection[process.env.NODE_ENV]);
Model.knex(knexConnection);

export class UserSchema extends Model {
  static tableName = 'user';

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

const generateToken = user => {
  const payload = {
    sub: user.id
  };

  const token = jwt.sign(payload, 'SECRET', { expiresIn: '1000' });
  return token;
};

const getPayload = token => {
  if (!token) return '';
  const payload = token.split('.')[1];

  return JSON.parse(atob(payload));
};

const authenticateUser = async (email, password) => {
  const userArray = await UserSchema.query().where('email', '=', email);
  const user = userArray[0];
  if (!user || user.password !== password) return '';

  const token = generateToken(user);

  return token;
};

const authorizeUser = async token => {
  if (!token) return '';
  const payload = getPayload(token);
  const expirery = payload.exp;
  const now = moment().unix();
  const isNotValid = now > expirery;

  if (isNotValid) {
    return '';
  }

  const user = await UserSchema.query().findById(payload.sub);

  return user;
};

export const User = {
  authenticateUser,
  authorizeUser
};
