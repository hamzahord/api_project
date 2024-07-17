const db = require("../models");
const supabase = db.supabase;

exports.createArticle = async (req, res) => {
  try {
    const { data: article, error } = await supabase
      .from('articles')
      .insert({
        author_id: req.userId,
        date_publi: new Date(),
        title: req.body.title,
        text: req.body.text
      })
      .single();

    if (error) throw error;

    res.status(201).send(article);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, title, author_id, date_publi');

    if (error) throw error;

    res.status(200).send(articles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const { data: article, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    res.status(200).send(article);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
