// Update with your config settings.

module.exports = {
  /**
   * When this file is imported into a model the connection needs to specify the NODE_ENV
   * as a cumputed variable in [].
   *
   * See existing models for examples
   */
  test: {
    client: 'pg',
    connection: {
      user: 'sean_dev',
      database: 'mytestdatabase'
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`
    }
  },
  development: {
    client: 'pg',
    connection: {
      user: 'sean_dev',
      database: 'stockman_api'
    },
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/development`
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/production`
    }
  }
};
