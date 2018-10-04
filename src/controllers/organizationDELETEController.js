'use strict';

const DAO = require('../data-access/dao');
const logger = require('../utils/logger');

module.exports = {
  deleteOrgByName: async function(req, res) {
    const name = req.params.name;
    const where_clause = Object.assign({}, { where: { name: name } }, {});

    let org;
    try {
      await DAO.deleteOrg(where_clause);
      return res.status(200).json({ message: 'Successfully deleted org' });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not delete org' });
    }
  },

  deleteOrgByCode: async function(req, res) {
    const code = req.params.code;
    const where_clause = Object.assign({}, { where: { code: code } }, {});

    try {
      await DAO.deleteOrg(where_clause);
      return res.status(200).json({ message: 'Successfully deleted org' });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not delete org' });
    }
  },

  deleteAllOrgs: async function(req, res) {
    try {
      await DAO.deleteAllOrgs();
      return res.status(200).json({ message: 'Successfully deleted all orgs' });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not delete all orgs' });
    }
  }
};
