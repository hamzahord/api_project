const db = require("../models");
const supabase = db.supabase;
const Comment = db.comment;

exports.createComment = async (req, res) => {
  try {
    const { article_id, content } = req.body;
    const { userId } = req;

    const { data: comment, error } = await Comment.create({
      article_id,
      user_id: userId,
      content
    });

    //if (error) {
    //  throw error;
    //}

    // Émettez l'événement WebSocket ici
    //req.app.get('io').emit('newComment', comment);

    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCommentsByArticleId = async (req, res) => {
  try {
    const { article_id } = req.params;

    const { data: comments, error } = await Comment.findAllByArticleId(article_id);

    if (error) {
      throw error;
    }

    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
