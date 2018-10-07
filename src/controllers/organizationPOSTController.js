'use strict';

const DAO = require('../data-access/dao');
const CONST = require('../utils/constants');

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
      return res.status(CONST.HTTP_INTERNAL_SERVER_ERROR).json({ message: data.error });
    } else {
      return res.status(CONST.HTTP_OK).json({ message: 'Successfully persisted org'});
    }
  }
};
