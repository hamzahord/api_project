const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/comments", [authJwt.verifyToken], controller.createComment);

  app.get("/api/comments/:article_id", [authJwt.verifyToken], controller.getCommentsByArticleId);
};
