'use strict';

const DAO = require('../data-access/dao');

module.exports = {
  postOrg: async function(req, res) {
    const orgData = {
      name: req.body.name,
      description: req.body.description || null,
      url: req.body.url || null,
      code: req.body.code,
      type: req.body.type
    };

    const data = await DAO.persistOrg(orgData);

    if (data.error !== null) {
      return res.status(500).json({ message: data.error });
    } else {
      return res.status(200).json({ message: 'Successfully persisted org'});
    }
  }
};
