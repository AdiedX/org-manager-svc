'use strict';

const router = require('express').Router();
const constants = require('../utils/constants');
const OrganizationsGETController = require('../controllers/organizationsGETController');
const OrganizationsPOSTController = require('../controllers/organizationsPOSTController');

router.post(constants.API_PATH + 'organizations', OrganizationsPOSTController.postOrg);
router.get(constants.API_PATH + 'organizations', OrganizationsGETController.getOrg);

module.exports = router;
