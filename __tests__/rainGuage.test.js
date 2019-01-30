/* globals describe it  */

import { expect } from 'chai';
import uuids from '../db/seedData/uuids';
import * as rainGuageApi from './rainGuageApi';

describe('Rain Guage', () => {
  describe('rainGuage(id: ID!): RainGuage', () => {
    it('returns a rain guage', async () => {
      const expectedResult = {
        data: {
          RainGuage: {
            id: uuids.rainGuageIds[0],
            farm_id: uuids.farmIds[0]
          }
        }
      };
      const result = await rainGuageApi.rainGuage({ id: '491c4b10-eacb-4590-a162-00d25daf889c' });
      expect(result.data).to.eql(expectedResult);
    });

    it('returns a rain guage with rainfall', async () => {
      const expectedResult = {
        data: {
          RainGuage: {
            id: uuids.rainGuageIds[0],
            farm_id: uuids.farmIds[0],
            dailyRainfall: [
              {
                id: uuids.dailyRainfallIds[7],
                rainfall: 27,
                date: '1546898400000',
                guage_id: uuids.rainGuageIds[0],
                unit: 'mm'
              }
            ],
            monthlyRainfall: [
              {
                id: uuids.monthlyRainfallIds[0],
                rainfall: 43,
                date: '1547071200000',
                year: 2019,
                month: 0,
                guage_id: uuids.rainGuageIds[0],
                unit: 'mm'
              }
            ],
            twelveMonthRunningRainfall: []
          }
        }
      };
      const result = await rainGuageApi.rainGuageWithRainfall({
        id: '491c4b10-eacb-4590-a162-00d25daf889c',
        limit: 2
      });

      expect(result.data).to.eql(expectedResult);
    });
  });
});
