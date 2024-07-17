import React, { Component } from "react";
import ArticleService from "../services/article.service";
import { withRouter } from '../common/with-router';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        title: "",
        text: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArticle(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          title: title
        }
      };
    });
  }

  onChangeText(e) {
    const text = e.target.value;

    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        text: text
      }
    }));
  }

  getArticle(id) {
    ArticleService.getArticleById(id)
      .then(response => {
        this.setState({
          currentArticle: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateArticle() {
    ArticleService.updateArticle(
      this.state.currentArticle.id,
      this.state.currentArticle
    )
      .then(response => {
        this.setState({
          message: "The article was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArticle() {    
    ArticleService.deleteArticle(this.state.currentArticle.id)
      .then(response => {
        this.props.router.navigate("/user");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArticle } = this.state;

    return (
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Edit Article</h4>
            <Form
              onSubmit={this.updateArticle}
              ref={c => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArticle.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="text">Text</label>
                <Input
                  type="text"
                  className="form-control"
                  id="text"
                  value={currentArticle.text}
                  onChange={this.onChangeText}
                />
              </div>

              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  this.checkBtn = c;
                }}
              />
            </Form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArticle}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Article...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditArticle);
