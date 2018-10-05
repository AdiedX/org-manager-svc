'use strict';

const DAO = require('../data-access/dao');

module.exports = {
  getOrgByName: async function(req, res) {
    const name = req.params.name;

    let org;
    try {
      org = await DAO.fetchOrg({ name: name });

      if (org !== null) {
        return res.status(200).json(org);
      } else {
        return res.status(500).json({ message: 'Org with that name does not exist' });
      }
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

      if (org !== null) {
        return res.status(200).json(org);
      } else {
        return res.status(500).json({ message: 'Org with that code does not exist' });  
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not fetch org' });
    }
  },

  getAllOrgs: async function(req, res) {
    try {
      const orgs = await DAO.fetchAllOrgs();
      if (orgs.length) {
        return res.status(200).json(orgs);
      } else {
        return res.status(404).json({ message: 'No orgs found' });
      }
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: 'Could not fetch orgs' });
    }
  }
};
