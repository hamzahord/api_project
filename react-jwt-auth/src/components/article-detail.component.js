import React, { Component } from "react";
import ArticleService from "../services/article.service";
import { withRouter } from '../common/with-router';

class ArticleDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null,
    };
  }

  componentDidMount() {
    const id = this.props.router.params.id;
    this.getArticle(id);
  }

  getArticle(id) {
    ArticleService.getArticleById(id).then(
      response => {
        this.setState({
          article: response.data
        });
      },
      error => {
        console.error("There was an error fetching the article!", error);
      }
    );
  }

  render() {
    const { article } = this.state;

    if (!article) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{article.title}</h3>
        </header>
        <div>
          <p>{article.text}</p>
          <p>{article.author} - {new Date(article.date_publi).toLocaleString()}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(ArticleDetail);
