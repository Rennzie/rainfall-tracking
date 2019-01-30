/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql';

export const rainGuage = async variables =>
  axios.post(API_URL, {
    query: `
      query($id: ID!) {
        RainGuage(id: $id) {
          id
          farm_id
        }
      }
    `,
    variables
  });

export const rainGuageWithRainfall = async variables =>
  axios.post(API_URL, {
    query: `
    query($id: ID!, $limit: Int) {
      RainGuage(id: $id) {
        id
        farm_id
        dailyRainfall(limit: $limit){
          id
          rainfall
          unit
          date
          guage_id
        }
        monthlyRainfall{
          id
          rainfall
          unit
          date
          guage_id
          year
          month
          
        }
        twelveMonthRunningRainfall{
          id
          rainfall
          unit
          date
          guage_id
          year
          month
          
        }
      }
    }
    `,
    variables
  });
