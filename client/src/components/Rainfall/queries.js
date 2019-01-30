import gql from 'graphql-tag';

export const NEW_RAINFALL = gql`
  mutation createRainfallMutation($id: ID!, $guageId: ID!, $rainfall: Int!, $date: String!) {
    newRainfall: createRainfall(
      id: $id
      guage_id: $guageId
      rainfall: $rainfall
      date: $date
      unit: "mm"
    ) {
      id
      guage_id
      rainfall
      date
      unit
    }
  }
`;

export const GET_MONTHLY_RAINFALL = gql`
  query GetRainfallQuery($guageId: ID!) {
    rainfall: RainGuage(id: $guageId) {
      id
      farm_id
      monthlyRainfall {
        id
        guage_id
        rainfall
        unit
        date
      }
    }
  }
`;

export const GET_TMRR_RAINFALL = gql`
  query GetRainfallQuery($guageId: ID!) {
    rainfall: RainGuage(id: $guageId) {
      id
      farm_id
      twelveMonthRunningRainfall {
        id
        guage_id
        rainfall
        unit
        date
      }
    }
  }
`;

export const GET_DAILY_RAINFALL = gql`
  query GetRainfallQuery($guageId: ID!, $limit: Int) {
    rainfall: RainGuage(id: $guageId) {
      id
      farm_id
      dailyRainfall(limit: $limit) {
        id
        guage_id
        rainfall
        unit
        date
      }
    }
  }
`;

export const GET_MORE_DAILY_RAINFALL = gql`
  query GetMoreRainfallQuery($guageId: ID!, $limit: Int!, $cursor: String!) {
    moreRainfall: MoreDailyRainfall(limit: $limit, cursor: $cursor, guageId: $guageId) {
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
`;
