import React, { Component } from "react";
import ArticleService from "../services/article.service";
import AuthService from "../services/auth.service"; // Importez AuthService pour obtenir les rôles de l'utilisateur
import { withRouter } from '../common/with-router';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

class CreateArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      message: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const articleData = {
      title: this.state.title,
      text: this.state.text
    };

    ArticleService.createArticle(articleData).then(
      response => {
        const user = AuthService.getCurrentUser();
        if (user.roles.includes("ROLE_ADMIN")) {
          this.props.router.navigate("/admin");
        } else if (user.roles.includes("ROLE_MODERATOR")) {
          this.props.router.navigate("/mod");
        } else {
          this.props.router.navigate("/user");
        }
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage
        });
      }
    );
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                className="form-control"
                name="title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="text">Text</label>
              <Input
                type="text"
                className="form-control"
                name="text"
                value={this.state.text}
                onChange={this.handleTextChange}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Create Article</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateArticle);
