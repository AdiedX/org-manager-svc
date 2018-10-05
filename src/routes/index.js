'use strict';

const router = require('express').Router();
const constants = require('../utils/constants');
const authController = require('../controllers/authController');
const organizationsGETController = require('../controllers/organizationsGETController');
const organizationPOSTController = require('../controllers/organizationPOSTController');
const organizationPUTController = require('../controllers/organizationPUTController');
const organizationDELETEController = require('../controllers/organizationDELETEController');

router.all('*', authController.verifyToken());

/**
 * HTTP POST
 */
router.post(constants.API_PATH + 'organizations', organizationPOSTController.postOrg);

/**
 * HTTP PUT
 */
router.put(constants.API_PATH + 'organizations/c/:code', organizationPUTController.updateOrg);

/**
 * HTTP GET
 * Get all orgs
 */
router.get(constants.API_PATH + 'organizations', organizationsGETController.getAllOrgs);

/**
 * HTTP GET
 * Get org based on name
 */
router.get(constants.API_PATH + 'organizations/n/:name', organizationsGETController.getOrgByName);

/**
 * HTTP GET
 * Get org based on code
 */
router.get(constants.API_PATH + 'organizations/c/:code', organizationsGETController.getOrgByCode);

/**
 * HTTP DELETE
 * Delete all orgs
 */
router.delete(constants.API_PATH + 'organizations', organizationDELETEController.deleteAllOrgs);

/**
 * HTTP DELETE
 * Delete org based on name
 */
router.delete(constants.API_PATH + 'organizations/n/:name', organizationDELETEController.deleteOrgByName);

/**
 * HTTP DELETE
 * Delete org based on code
 */
router.delete(constants.API_PATH + 'organizations/c/:code', organizationDELETEController.deleteOrgByCode);

module.exports = router;
