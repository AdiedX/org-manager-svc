'use strict';

const DAO = require('../data-access/dao');
const CONST = require('../utils/constants');

module.exports = {
  getOrgByName: async function(req, res) {
    const name = req.params.name;

    let org;
    try {
      org = await DAO.fetchOrg({ name: name });

      if (org !== null) {
        global.memCache.put(req.cacheKey, org, req.cacheDuration * 1000);
        return res.status(CONST.HTTP_OK).json(org);
      } else {
        return res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Org with that name does not exist' });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch org' });
    }
  },

  getOrgByCode: async function(req, res) {
    const code = req.params.code;

    let org;
    try {
      org = await DAO.fetchOrg({ code: code });

      if (org !== null) {
        global.memCache.put(req.cacheKey, org, req.cacheDuration * 1000);
        return res.status(CONST.HTTP_OK).json(org);
      } else {
        return res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Org with that code does not exist' });  
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch org' });
    }
  },

  getAllOrgs: async function(req, res) {
    try {
      const orgs = await DAO.fetchAllOrgs();
      if (orgs.length) {
        global.memCache.put(req.cacheKey, orgs, req.cacheDuration * 1000);
        return res.status(CONST.HTTP_OK).json(orgs);
      } else {
        return res.status(CONST.HTTP_NOT_FOUND).json({ message: 'No orgs found' });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ error: 'Could not fetch orgs' });
    }
  }
};
