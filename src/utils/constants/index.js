'use strict';

module.exports = Object.freeze({
  API_PATH: '/api/v1/',
  HTTP_OK: 200,
  HTTP_NOT_FOUND: 404,
  HTTP_INTERNAL_SERVER_ERROR: 500,
  HTTP_BAD_REQUEST: 400,
  HTTP_CONFLICT: 409,
  MANDATORY_KEYS: ['name', 'code'],
  OPTIONAL_KEYS: ['url', 'description', 'type'],
  ALLOWED_TYPES: ['EMPLOYER', 'INSURANCE', 'HEALTH SYSTEM']
});
