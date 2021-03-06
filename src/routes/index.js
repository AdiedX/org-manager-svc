'use strict';

const router = require('express').Router();
const constants = require('../utils/constants');
const authController = require('../controllers/authController');
const memCacheController = require('../controllers/memCacheController');
const validationController = require('../controllers/validationController');
const organizationsGETController = require('../controllers/organizationsGETController');
const organizationPOSTController = require('../controllers/organizationPOSTController');
const organizationPUTController = require('../controllers/organizationPUTController');
const organizationDELETEController = require('../controllers/organizationDELETEController');

// Secure all endpoints
router.all('*', authController.verifyToken());

/**
 * HTTP POST
 * Save a new org
 */
router.post(constants.API_PATH + 'organizations', validationController.validateRequestBodyParams, organizationPOSTController.postOrg);

/**
 * HTTP PUT
 * Update an org
 */
router.put(constants.API_PATH + 'organizations/c/:code', validationController.validateRequestBodyParams, organizationPUTController.updateOrg);

/**
 * HTTP GET
 * Get all orgs
 */
router.get(constants.API_PATH + 'organizations', memCacheController.cache(100), organizationsGETController.getAllOrgs);

/**
 * HTTP GET
 * Get org based on name
 */
router.get(constants.API_PATH + 'organizations/n/:name', memCacheController.cache(100), organizationsGETController.getOrgByName);

/**
 * HTTP GET
 * Get org based on code
 */
router.get(constants.API_PATH + 'organizations/c/:code', memCacheController.cache(100), organizationsGETController.getOrgByCode);

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
