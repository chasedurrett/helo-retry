import React, { Component } from "react";
import "./Dashboard.css";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      userPosts: true,
      posts: [],
    };
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    const { search, userPosts } = this.state;
    axios
      .get(`/api/posts?userPosts=${userPosts}&search=${search}`)
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  delete(postid) {
    axios.delete(`/api/post/${postid}`)
    .then(res => {
        this.setState({
            posts: res.data
        })
        this.props.history.push('/dashboard')
    })
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="dashboard-container">
        <div className="search-box">
          <div className="search-bar">
            <input
              className="search-input"
              name="search"
              placeholder="Search by title.."
            />
            <span className="search-button">
              <img
                alt="search-icon"
                className="search-icon"
                src="https://img.icons8.com/carbon-copy/2x/search-more.png"
              />
            </span>
            <button className="reset-button">Reset</button>
          </div>
          <div className="my-posts">
            <h3>My Posts</h3>
            <input type="checkbox" />
          </div>
        </div>
        <div className="post-container">
          {posts.map((e, i) => (
            <div deleteProduct={this.delete} key={i} className="post-container-sole">
              <div className="title-container">
              <h2 className="post-title"><Link to={{pathname: `/post/${e.post_id}`}} className="post-title">{e.title}</Link></h2>
              </div>
              <div className="post-author-photo-container">
                <h4 className="by-author">by {e.author}</h4>
                <img className="profile-pic" alt="profile-pic" src={e.profile_pic} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Dashboard);
