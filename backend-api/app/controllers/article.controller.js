const db = require('../models');
const Article = db.article;
const Role = db.role;

exports.createArticle = async (req, res) => {
  try {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      roles: req.body.roles,
    });

    await article.save();
    res.status(201).send({ message: 'Article created successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const userRoles = req.user.roles;
    const articles = await Article.find({
      roles: { $in: userRoles },
    }).populate('roles', 'name');

    res.status(200).send(articles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};