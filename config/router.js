const express = require('express');
const farmController = require('../controllers/farmController');

const Router = express.Router();

Router.get('/farms', farmController.index);

Router.get('/farms/:id', farmController.show);

module.exports = Router;
