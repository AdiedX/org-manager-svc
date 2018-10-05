'use strict';

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const logger = require('../utils/logger');
/**
 * Authorization middleware
 */

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
