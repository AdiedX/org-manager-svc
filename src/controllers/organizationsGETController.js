'use strict';

const DAO = require('../data-access/dao');

module.exports = {
  getOrgByName: async function(req, res) {
    const name = req.params.name;

    let org;
    try {
      org = await DAO.fetchOrg({ name: name });
      return res.status(200).json(org);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not fetch org' });
    }
  },

  getOrgByCode: async function(req, res) {
    const code = req.params.code;

    let org;
    try {
      org = await DAO.fetchOrg({ code: code });
      return res.status(200).json(org);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not fetch org' });
    }
  },

  getAllOrgs: async function(req, res) {
    try {
      const orgs = await DAO.fetchAllOrgs();
      return res.status(200).json(orgs);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not fetch orgs' });
    }
  }
};
