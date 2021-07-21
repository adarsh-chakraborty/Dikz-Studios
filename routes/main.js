const express = require('express');

const mainRoutes = require('../controllers/main');

const Router = express.Router();


Router.get('/',mainRoutes.getIndex);


module.exports = Router;