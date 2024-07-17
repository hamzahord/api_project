const { authJwt } = require("../middleware");
const articleController = require("../controllers/article.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/articles/add",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    articleController.createArticle
  );

  app.get(
    "/api/articles",
    [authJwt.verifyToken],
    articleController.getAllArticles
  );

  app.get(
    "/api/articles/:id",
    [authJwt.verifyToken],
    articleController.getArticleById
  );
};
