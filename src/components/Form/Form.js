import React, { Component } from "react";
import "./Form.css";
import { connect } from "react-redux";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: "",
    };
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createPost = () => {
    const { title, img, content } = this.state;
    axios
      .post(`/api/post`, { title, img, content })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state);
    return (
      <div className="form-section">
        <div className="form-container">
          <div className="form-title-container">
            <h1>New Post</h1>
          </div>
          <div className="title-input-container">
            <h3>Title:</h3>
            <input
              onChange={(e) => this.handleInput(e)}
              className="form-input"
              name="title"
            />
          </div>
          <img className="img-preview" alt="preview" />
          <div className="url-input-container">
            <h3>Image URL:</h3>
            <input
              onChange={(e) => this.handleInput(e)}
              className="form-input"
              name="img"
            />
          </div>
          <div className="content-input-container">
            <h3>Content:</h3>
            <input
              onChange={(e) => this.handleInput(e)}
              
              className="form-input content-input"
              name="content"
            />
          </div>

          <div className="button-container">
            <button className="post-button" onClick={() => this.createPost()}>
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Form);
