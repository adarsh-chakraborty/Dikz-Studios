const express = require('express');

const apiController = require('../controllers/api');

const Router = express.Router();

Router.get('/stats', apiController);

module.exports = Router;