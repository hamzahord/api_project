const { authJwt } = require('../middlewares');
const controller = require('../controllers/article.controller');

module.exports = function (app) {
  app.post('/api/articles', [authJwt.verifyToken, authJwt.isAdmin], controller.createArticle);
  app.get('/api/articles', [authJwt.verifyToken], controller.getArticles);
};