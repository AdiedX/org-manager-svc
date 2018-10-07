'use strict';

const memCache = require('memory-cache');
const CONST = require('../utils/constants');

global.memCache = memCache;

/**
 * Caches HTTP GET calls
 */
module.exports = {
  cache: function(cacheDuration) {
    return function cacheMiddleware(req, res, next) {
      const cacheKey = '__org_manager__' + req.originalUrl || url;
      const cachedVal = global.memCache.get(cacheKey);
      if (cachedVal) {
        return res.status(CONST.HTTP_OK).json(cachedVal);
      } else {
        req.cacheKey = cacheKey;
        req.cacheDuration = cacheDuration;
        next();
      }
    }
  }
};
