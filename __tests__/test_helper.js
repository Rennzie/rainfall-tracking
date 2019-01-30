import { should, expect, use } from 'chai';

import supertest from 'supertest';
import app from '../server';

// process.env.NODE_ENV = 'test';

// eslint-disable-next-line import/no-extraneous-dependencies
global.Promise = require('bluebird');

global.should = should();
global.expect = expect;

use(require('chai-like'));
use(require('chai-things'));

global.api = supertest(app);
