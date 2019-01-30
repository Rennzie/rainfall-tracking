/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { gql } from 'apollo-server';

const API_URL = 'http://localhost:4000/graphql';

export const rainfalls = async () =>
  axios.post(API_URL, {
    query: `
      query {
        Rainfalls {
          id
          guage_id
          rainfall
          unit
          date
        }
      }
    `
  });

export const moreRainfall = async variables =>
  axios.post(API_URL, {
    query: `
      query($limit: Int!, $cursor: String!, $guageId: ID!) {
        MoreDailyRainfall(limit: $limit, cursor: $cursor, guageId: $guageId) {
          cursor
          rainfall {
            id
            guage_id
            rainfall
            unit
            date
          }
        }
      }
    `,
    variables
  });
