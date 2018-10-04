'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const methodOverride = require('method-override');
const routes = require('./routes');
const logger = require('./utils/logger');
const constants = require('./utils/constants');
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

// Logging
app.use(morgan('combined', { stream: logger.stream }));
app.use(methodOverride());
// Helmet security
app.use(helmet());
// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Register routes
app.use('/', routes);
// Error handling
app.use(function(err, req, res, next) {
  if (err) {
    logger.error(err.stack);
    res.status(500).json(err.message);
  }
});

const port = appEnv.port || 3000;
app.listen(port, appEnv.bind, () => logger.info(`Listening on port ${appEnv.url}`));
