import React, { Component } from "react";
import { connect } from "react-redux";
import "./Post.css";
import axios from "axios";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      img: "",
      content: "",
      author: "",
      profile_pic: "",
      post_id: ''
    };
  }

  getPost() {
    const { postid } = this.props.match.params;
    axios.get(`/api/post/${postid}`).then((res) => {
      const { title, img, content, author, profile_pic, post_id } = res.data;
      this.setState({
        title,
        img,
        content,
        author,
        profile_pic,
        post_id
      });
    });
  }

  componentDidMount() {
    this.getPost();
  }

  

  render() {
    const { title, img, content, author, profile_pic, post_id } = this.state;
    console.log(this.state);
    return (
      <div className="post-section">
        <div className="post-container">
          <div className="post-header">
            <h2>{title}</h2>
            <div className="by-author-img">
              <h4>by {author}</h4>
              <img alt="author-profile-pic" src={profile_pic} />
            </div>
          </div>
          <div className="post-body">
            <div className="post-body-img-container">
              <img alt="post-pic" src={img} />
            </div>
            <div className="post-body-content-container">
              <p>{content}</p>
            </div>
          </div>
          <div><button onClick={() => this.props.deletePost(post_id)}>Delete</button></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Post);
