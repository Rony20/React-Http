import React, { Component } from "react";

import axios from 'axios'
import "./Posts.css"
import Post from "../../../components/Post/Post"

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
      console.log(this.props)
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Rohan",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        // this.setState({ error: true });
        console.log(error);
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong !</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            title={post.title}
            author={post.author}
            key={post.id}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts