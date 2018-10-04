'use strict';

const DAO = require('../data-access/dao');

module.exports = {
  updateOrg: async function(req, res) {
    const code = req.params.code;
    const orgData = req.body;

    const result = await DAO.modifyOrg(orgData, code);

    if (result.error !== null) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ message: 'Successfully modified specified org' });
    }
  }
};
