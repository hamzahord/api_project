const { authJwt } = require('../middlewares');
const controller = require('../controllers/role.controller');

module.exports = function (app) {
  app.get('/api/roles', [authJwt.verifyToken], controller.getRoles);
};