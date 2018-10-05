'use strict';

const localCreds = require('./local.config.json').credentials;

module.exports = {
  local: {
    username: "adi",
    password: null,
    database: "orgs_dev",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  development: {
    username: localCreds.username,
    password: localCreds.password,
    database: localCreds.database,
    host: localCreds.host,
    port: localCreds.port,
    dialect: "postgres"
  },
  test: {
    username: "adi",
    password: null,
    database: "orgs_test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  }
}
