'use strict';

const CONST = require('../utils/constants');

module.exports = {
  validateRequestBodyParams: function(req, res, next) {
    const body = req.body;

    const hasMandatoryKeys = CONST.MANDATORY_KEYS.every(function(key) {
      return Object.keys(body).includes(key);
    });

    if (!hasMandatoryKeys) {
      return res.status(CONST.HTTP_BAD_REQUEST).json({
        message: `'name' and 'code' are mandatory keys`
      });      
    }

    Object.keys(body).forEach(function(e) {
      if ( CONST.MANDATORY_KEYS.includes(e) || CONST.OPTIONAL_KEYS.includes(e) ) {
        return;
      } else {
        delete req.body[e];
      }
    });

    if (!(body.name.length && body.code.length)) {
      return res.status(CONST.HTTP_BAD_REQUEST).json({
        message: `'name' and code cannot be empty values`
      });
    }

    if (! ( body.type && CONST.ALLOWED_TYPES.includes(body.type)) ) {
      return res.status(CONST.HTTP_BAD_REQUEST).json({
        message: `Value for 'type' is not allowed`
      });
    }
    next();
  }
};
