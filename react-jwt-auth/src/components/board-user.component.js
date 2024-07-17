import React, { Component } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      articles: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          articles: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>User Board</h3>
        </header>
        <div>
          {this.state.articles.map(article => (
            <div key={article.id}>
              <h4>
                <Link to={`/article/${article.id}`}>
                  {article.title}
                </Link>
              </h4>
              <p>{article.author} - {new Date(article.date_publi).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
