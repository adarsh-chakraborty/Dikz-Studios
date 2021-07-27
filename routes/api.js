const express = require('express');

const apiController = require('../controllers/api');
const contactController = require('../controllers/contact');

const Router = express.Router();

Router.get('/stats', apiController.getStats);

Router.get('/latest', apiController.getLatest);

Router.get('/popular', apiController.getPopular);

Router.get('/video', apiController.getVideoStats);

Router.post('/contact', contactController.postContact);



module.exports = Router;