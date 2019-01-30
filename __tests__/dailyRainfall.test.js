/* globals describe it  */

import { expect } from 'chai';
import moment from 'moment';
import uuids from '../db/seedData/uuids';
import * as rainfallApi from './dailyRainfallApi';

describe('Daily Rainfall', () => {
  describe('Rainfalls Index', () => {
    it('returns an array of daily rainfall objects', async () => {
      const result = await rainfallApi.rainfalls();

      expect(result.data.data.Rainfalls).to.be.an('array');
      expect(result.data.data.Rainfalls[0]).to.have.property('id');
      expect(result.data.data.Rainfalls[0]).to.have.property('guage_id');
      expect(result.data.data.Rainfalls[0]).to.have.property('rainfall');
      expect(result.data.data.Rainfalls[0]).to.have.property('unit');
      expect(result.data.data.Rainfalls[0]).to.have.property('date');
    });

    it('returns an array of daily rainfall with a cursor', async () => {
      const result = await rainfallApi.moreRainfall({
        limit: 5,
        cursor: '1546466400000',
        guageId: uuids.rainGuageIds[0]
      });

      expect(result.data.data.MoreDailyRainfall).to.have.property('cursor');
      expect(result.data.data.MoreDailyRainfall).to.have.property('rainfall');
      expect(result.data.data.MoreDailyRainfall.rainfall[0]).to.have.property('rainfall');
      expect(result.data.data.MoreDailyRainfall.rainfall[0]).to.have.property('guage_id');
      expect(result.data.data.MoreDailyRainfall.rainfall[0]).to.have.property('unit');
      expect(result.data.data.MoreDailyRainfall.rainfall[0]).to.have.property('date');
      expect(result.data.data.MoreDailyRainfall.rainfall[0]).to.have.property('id');

      // eslint-disable-next-line no-unused-expressions
      expect(
        moment(parseInt(result.data.data.MoreDailyRainfall.rainfall[0].date, 10)).isBefore(
          moment(1546466400000)
        )
      ).to.be.true;

      expect(result.data.data.MoreDailyRainfall.rainfall.length).to.eq(5);
    });
  });
});
