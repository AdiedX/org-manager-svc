'use strict';

const models = require('../models/index');
const logger = require('../utils/logger');

module.exports = {
  persistOrg: async function(orgData) {
    try {
      const count = await models.Organization.count({
        where: {
          name: orgData.name,
          code: orgData.code
        }
      });

      if (count > 0) {
        logger.error('Org with specified name/code combo already exists');
        return {
          persisted: false,
          error: 'Org with specified name/code combo already exists'
        };
      } else {
        await models.Organization.create({
          name: orgData.name,
          description: orgData.description,
          url: orgData.url,
          code: orgData.code,
          type: orgData.type
        });
  
        logger.info('Org created');
        return {
          persisted: true,
          error: null
        };
      }
    } catch (error) {
      logger.error(error.message);
      return { persisted: false, error: error.message };
    }
  },

  modifyOrg: async function(modify_clause, code) {
    try {
      const count = await models.Organization.count({
        where: {
          code: code
        }
      });

      if (count > 0) {
        await models.Organization.update(modify_clause, { where: { code: code }});
        logger.info('[PUT] Org modified');
        return {
          modified: true,
          error: null
        };
      } else {
        const error = new Error(`No such org with ${where_clause.code} exists to modify`);
        logger.error(error.message);
        return {
          modified: false,
          error: error
        };
      }
    } catch (error) {
      logger.error(error.message);
      return {
        modified: false,
        error: error
      };
    }
  },

  fetchOrg: async function(where_clause) {
    try {
      const org = await models.Organization.findOne({
        where: where_clause
      });

      logger.info('Org queried');
      return org;
    } catch (error) {
      logger.error(error.message);
    }
  },

  fetchAllOrgs: async function(orgData) {
    try {
      const orgs = await models.Organization.findAll();
      logger.info('Orgs queried');
      return orgs;
    } catch (error) {
      logger.error(error.message);
    }
  },

  deleteOrg: async function(where_clause) {
    try {
      const org = await models.Organization.destroy(where_clause);
      logger.info('Org deleted');
      return org;
    } catch (error) {
      logger.error(error.message);
    }
  },

  deleteAllOrgs: async function() {
    try {
      await models.Organization.destroy({
        where: {},
        truncate: true
      });

      logger.info('Orgs deleted');
    } catch (error) {
      logger.error(error.message);
    }
  }
};
