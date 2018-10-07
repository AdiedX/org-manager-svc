# Organization Manager Service
A simple microservice for managing information about organizations

- [Local Setup](#local-setup)
- [Service URL](#service-url)
- [Auth](#auth)
- [API](#api)
- [Codebase](#codebase)

## Local Setup
* Have Node 8 or above installed
* NPM 5 or above
* Postgres installed and running locally: `brew install postgres` && `brew services start postgresql`

### Environment setup
For local development, update the file `src/config/config.js` with your Postgres information:
```javascript
  local: {
    username: "<your postgres superuser name>",
    password: null,
    database: "orgs_dev",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres"
  },
  ```

### Database & Migrations
* Log into Postgres: `psql`
* Create db: `create database org_dev;`
* Run migations: `sequelize db:migrate` (from bash)

### Build
```npm install```

### Run server
```npm run start:local```

## Service URL
https://org-manager-svc.herokuapp.com

*Note: Heroku puts the service dyno in an idle state after certain amount of inactivity. So the first request you make might have a delayed response time.*

## Auth
All API endpoints are secure via oauth 2. You would need to add the following header with the token for a successful request:

```
Authorization: Bearer <access_token>
```

To fetch token, execute this [piece of code](https://repl.it/@AdiS1/DarkseagreenAnchoredAttribute)

## API

### `HTTP POST /api/v1/organizations`
*Persists new org based request body parameters*

Request body:
```json
{
   "name": "AIC Insurance",
   "description": "Some insurance company",
   "url": "www.aic-insurance.com",
   "code": "AIC",
   "type": "INSURANCE"
}
```

Required keys:
* `name` - Alphabetic name of the org
* `code` - Alphanumeric code of the org

Optional keys:
* `url` - Website url of the org
* `description` - Alphanumeric description of the org
* `type` - Capitalized alphabetic type of the org: 'INSURANCE', 'EMPLOYER', or 'HEALTH SYSTEM'

### `HTTP PUT /api/v1/organizations/c/{code}`
*Updates org based on code and request body parameters*

Required path params:
* `code` - Alphanumeric code of the org you want to update

Request body:
```json
{
   "name": "BIC Insurance",
   "description": "Some insurance company",
   "url": "www.bic-insurance.com",
   "code": "BIC",
   "type": "INSURANCE"
}
```
Required keys:
* `name` - Alphabetic name of the org
* `code` - Alphanumeric code of the org

Optional keys:
* `url` - Website url of the org
* `description` - Alphanumeric description of the org
* `type` - Capitalized alphabetic type of the org: 'INSURANCE', 'EMPLOYER', or 'HEALTH SYSTEM'

### ``HTTP GET /api/v1/organizations``
*Returns all org records*

```json
[
    {
        "id": 5,
        "name": "AIC Insurance",
        "description": "Some fake insurance company",
        "url": null,
        "code": "BIC",
        "type": "INSURANCE",
        "createdAt": "2018-10-05T08:58:56.604Z",
        "updatedAt": "2018-10-05T08:58:56.604Z"
    }
]
```

### `HTTP GET /api/v1/organizations/c/{code}`
*Returns org based on code*

```json

    {
        "id": 5,
        "name": "AIC Insurance",
        "description": "Some fake insurance company",
        "url": null,
        "code": "BIC",
        "type": "INSURANCE",
        "createdAt": "2018-10-05T08:58:56.604Z",
        "updatedAt": "2018-10-05T08:58:56.604Z"
    }
```

### `HTTP GET /api/v1/organizations/n/{name}`
*Returns org based on name*

```json

    {
        "id": 5,
        "name": "AIC Insurance",
        "description": "Some fake insurance company",
        "url": null,
        "code": "BIC",
        "type": "INSURANCE",
        "createdAt": "2018-10-05T08:58:56.604Z",
        "updatedAt": "2018-10-05T08:58:56.604Z"
    }
```

### ``HTTP DELETE /api/v1/organizations``
*Deletes all org records*

### `HTTP DELETE /api/v1/organizations/c/{code}`
*Deletes org based on code*

### `HTTP DELETE /api/v1/organizations/n/{name}`
*Deletes org based on name*

## Codebase

* **controllers/**: Route handling, caching and security logic
* **data-access/**: ORM logic to query the database
* **models/**: ORM models of business entities
* **routes/**: Registration of appropriate handlers to paths
* **migrations/**: Database migrations to be run
* **utils/**: Helper methods and constants
* **server.js**: Entry point to the application.

### Security Middleware
Verify access token from authorized client applications

```javascript
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
```

### Caching
Caching HTTP GET calls to increase performance using a simple node cache.

```javascript
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
```
