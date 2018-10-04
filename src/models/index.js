'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const logger = require('../utils/logger');

let sequelize;
if (config.cloud_db_env_variable && config.cloud_db_env_variable === process.env.CLOUD_CREDS) {
  const cloudCreds = appEnv.getService(config.cloud_db_env_variable).credentials;

  const url = 'postgres://' + cloudCreds.username + ':' + cloudCreds.password + '@' + cloudCreds.cloud_sql_server + ':' + '5432' + '/' + cloudCreds.username;
  sequelize = new Sequelize(url);
} else if (config.cloud_db_env_variable === 'local_config') {
  const localCreds = require('../config/local.config.json').credentials;

  sequelize = new Sequelize(localCreds.cloud_sql_server, localCreds.username, localCreds.password, {
    dialect: 'postgres'
  });
} else {
  sequelize = new Sequelize(config.username, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

logger.info(util.inspect('sequelize:', sequelize, { showHidden: false, depth: 2 }));
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
