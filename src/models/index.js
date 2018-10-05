'use strict';

const fs = require('fs');
const util = require('util');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const logger = require('../utils/logger');

let sequelize = new Sequelize(config.database, config.username, config.password, config);

console.log('env', env);

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

console.log('sequelize', sequelize);
sequelize.close;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;