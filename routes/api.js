const express = require('express');

const apiController = require('../controllers/api');

const Router = express.Router();

Router.get('/test', apiController.getTest);

Router.get('/stats', apiController.getStats);

Router.get('/latest', apiController.getLatest);

Router.get('/popular', apiController.getPopular);



module.exports = Router;