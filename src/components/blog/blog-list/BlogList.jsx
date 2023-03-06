import React, { useState } from "react";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { useEffect } from "react";
const BlogList = (props) => {
  const [posts,setPosts] = useState([])
  const fetchPosts = async ()=>{
    try {
      const response = await fetch(
        "http://localhost:3001/blogPosts",
      );
      if (response.ok) {
        let data = await response.json();
        setPosts(data)
      } else {
        alert("Fetching went wrong!!!!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchPosts();
  },[])
  return (
    <Row>
      {posts.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
          key={post.id}
        >
          <BlogItem key={post.title} id = {post.id} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
