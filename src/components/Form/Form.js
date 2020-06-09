import React, { Component } from "react";
import "./Form.css";
import { connect } from "react-redux";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
      content: "",
    };
  }

  render() {
    return (
      <div className="form-section">
        <div className="form-container">
        <div className="form-title-container">
          <h1>New Post</h1>
        </div>
        <div className="title-input-container">
        <h3>Title:</h3>
        <input />
        </div>
        <div className="url-input-container">
        <h3>Image URL:</h3>
        <input />
        </div>
        <div className="content-input-container">
        <h3>Content:</h3>
        <input />
        </div>
        
        <button />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Form);
