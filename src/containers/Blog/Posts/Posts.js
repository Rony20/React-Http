import React, { Component } from "react";
import { Route } from 'react-router-dom'

import axios from "axios";
import "./Posts.css";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost"

class Posts extends Component {
  state = {
    posts: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
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
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  postSelectedHandler = (id) => {
    // this.props.history.push({pathname: "/" + id})
    this.props.history.push("/posts/" + id);
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Loading...!</p>;
    if (!this.state.loading) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
