const { authJwt } = require("../middleware");
const controller = require("../controllers/article.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/articles",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.createArticle
  );

  app.get("/api/articles", [authJwt.verifyToken], controller.getAllArticles);

  app.get("/api/articles/:id", [authJwt.verifyToken], controller.getArticleById);
};
