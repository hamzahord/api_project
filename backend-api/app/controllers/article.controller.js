const db = require("../models");
const supabase = db.supabase;

exports.createArticle = async (req, res) => {
  try {
    const { title, text } = req.body;
    const { userId } = req;

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return res.status(404).send({ message: "User not found." });
    }

    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert({ author_id: user.id, title, text, date_publi: new Date() })
      .single();

    if (articleError) {
      throw articleError;
    }

    res.status(201).send({ message: "Article created successfully!", article });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, date_publi, author_id, users(username)')
      .eq('users.id', 'author_id');

    if (error) {
      throw error;
    }

    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: article, error } = await supabase
      .from('articles')
      .select('id, title, text, date_publi, author_id, users(username)')
      .eq('id', id)
      .single();

    if (error || !article) {
      return res.status(404).send({ message: "Article not found." });
    }

    res.status(200).send(article);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
