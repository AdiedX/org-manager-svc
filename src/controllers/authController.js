'use strict';

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const localCreds = require('../config/local.config.json').credentials;
const logger = require('../utils/logger');
/**
 * Authorization middleware
 */

logger.info('issuer:', process.env.AUTH_DOMAIN);
logger.info('audience:', process.env.AUTH_AUDIENCE);

module.exports = {
  verifyToken: function() {
    return jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 20,
        jwksUri: `${process.env.AUTH_DOMAIN}.well-known/jwks.json`
      }),
      audience: process.env.AUTH_AUDIENCE,
      issuer: process.env.AUTH_DOMAIN,
      algorithms: ['RS256']
    });
  }
};
