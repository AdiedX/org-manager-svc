'use strict';

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

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
        jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`
      }),
      audience: process.env.AUTH_AUDIENCE,
      issuer: `https://${process.env.AUTH_DOMAIN}`,
      algorithms: ['RS256']
    });    
  }
};
