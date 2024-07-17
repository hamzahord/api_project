import React, { Component } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";
import EventBus from "../common/EventBus";


export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      articles: []
    };
  }

  componentDidMount() {
    UserService.getModeratorBoard().then(
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

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Moderator Board</h3>
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
          <button onClick={() => this.props.router.navigate("/create-article")}>
            Create Article
          </button>
        </div>
      </div>
    );
  }
}
