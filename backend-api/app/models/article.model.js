const mongoose = require('mongoose');

const Article = mongoose.model(
  'Article',
  new mongoose.Schema({
    title: String,
    content: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  })
);

module.exports = Article;