'use strict';

const DAO = require('../data-access/dao');
const CONST = require('../utils/constants');

module.exports = {
  updateOrg: async function(req, res) {
    const code = req.params.code;
    const orgData = req.body;

    const result = await DAO.modifyOrg(orgData, code);

    if (result.error !== null) {
      res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ message: error.message });
    } else {
      res.status(CONST.HTTP_OK).json({ message: 'Successfully modified specified org' });
    }
  }
};
