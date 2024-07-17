import React, { Component } from "react";
import ArticleService from "../services/article.service";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    ArticleService.getAllArticles().then(
      response => {
        this.setState({
          articles: response.data
        });
      },
      error => {
        console.error("There was an error fetching the articles!", error);
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Admin Board</h3>
        </header>
        <div>
          {this.state.articles.length > 0 ? (
            this.state.articles.map(article => (
              <div key={article.id}>
                <h4>
                  <Link to={`/article/${article.id}`}>  {/* Utilisez Link pour inclure l'ID de l'article */}
                    {article.title}
                  </Link>
                </h4>
                <p>{article.author} - {new Date(article.date_publi).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No articles available</p>
          )}
        </div>
      </div>
    );
  }
}
